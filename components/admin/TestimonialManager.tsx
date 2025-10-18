import { useState } from "react";
import { useTestimonials } from "../../src/hooks/useTestimonials";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Plus, Pencil, Trash2, Star, MessageSquare, Loader2 } from "lucide-react";

export function TestimonialManager() {
    const { testimonials, loading, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
    const [editing, setEditing] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        rate: 5,
        description: "",
        role: "",
        location: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        if (editing) {
            await updateTestimonial(editing, formData);
        } else {
            await addTestimonial(formData);
        }

        setFormData({ rate: 5, description: "", role: "", location: "" });
        setEditing(null);
        setShowForm(false);
        setSubmitting(false);
    };

    const handleEdit = (testimonial: any) => {
        setEditing(testimonial.id);
        setFormData({
            rate: testimonial.rate || 5,
            description: testimonial.description,
            role: testimonial.role,
            location: testimonial.location
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this testimonial?")) {
            await deleteTestimonial(id);
        }
    };

    if (loading) {
        return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;
    }

    const inputClass = "bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white";

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Testimonials Management</h2>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                </Button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {editing ? "Edit Testimonial" : "Add New Testimonial"}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                Rating
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                        key={rating}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, rate: rating })}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`w-6 h-6 ${rating <= formData.rate
                                                ? "fill-indigo-600 text-indigo-600 dark:fill-indigo-500 dark:text-indigo-500"
                                                : "text-gray-300 dark:text-slate-600"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Textarea
                            placeholder="Testimonial description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className={inputClass}
                            rows={4}
                            required
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                placeholder="Role (e.g., Business Owner, Community Leader)"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className={inputClass}
                                required
                            />
                            <Input
                                placeholder="Location"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className={inputClass}
                                required
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={submitting}>
                                {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                {editing ? "Update" : "Add"} Testimonial
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 bg-white dark:bg-transparent"
                                onClick={() => {
                                    setEditing(null);
                                    setFormData({ rate: 5, description: "", role: "", location: "" });
                                    setShowForm(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {testimonials.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
                    <MessageSquare className="w-16 h-16 text-gray-400 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-slate-400 mb-2">No testimonials yet</p>
                    <p className="text-sm text-gray-500 dark:text-slate-500">Click "Add Testimonial" to create your first testimonial</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-1">
                                    {[...Array(testimonial.rate || 5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-indigo-600 text-indigo-600 dark:fill-indigo-500 dark:text-indigo-500" />
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                                        onClick={() => handleEdit(testimonial)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                                        onClick={() => handleDelete(testimonial.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">"{testimonial.description}"</p>
                            <div className="text-xs text-gray-500 dark:text-slate-500">
                                <p className="font-medium text-gray-900 dark:text-white">{testimonial.role}</p>
                                <p>{testimonial.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
