import { useState } from "react";
import { useProjects } from "../../src/hooks/useProjects";
import { uploadImage } from "../../src/lib/storage";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Plus, Pencil, Trash2, FolderKanban, Loader2, Upload, X } from "lucide-react";

export function ProjectManager() {
    const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
    const [editing, setEditing] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        location: "",
        description: "",
        image_url: "",
        rate: ""
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview("");
        setFormData({ ...formData, image_url: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        let imageUrl = formData.image_url;

        // Upload image if a new file is selected
        if (imageFile) {
            setUploading(true);
            const { url, error } = await uploadImage(imageFile);
            setUploading(false);

            if (error) {
                alert(`Image upload failed: ${error}`);
                setSubmitting(false);
                return;
            }

            imageUrl = url || "";
        }

        const projectData = {
            name: formData.name,
            date: formData.date,
            location: formData.location,
            description: formData.description,
            image_url: imageUrl || null,
            rate: formData.rate ? parseFloat(formData.rate) : null
        };

        if (editing) {
            await updateProject(editing, projectData);
        } else {
            await addProject(projectData);
        }

        resetForm();
        setSubmitting(false);
    };

    const resetForm = () => {
        setFormData({
            name: "",
            date: "",
            location: "",
            description: "",
            image_url: "",
            rate: ""
        });
        setImageFile(null);
        setImagePreview("");
        setEditing(null);
        setShowForm(false);
    };

    const handleEdit = (project: any) => {
        setEditing(project.id);
        const year = project.date ? project.date.split('-')[0] : '';
        setFormData({
            name: project.name,
            date: year ? `${year}-01-01` : '',
            location: project.location,
            description: project.description,
            image_url: project.image_url || "",
            rate: project.rate?.toString() || ""
        });
        setImagePreview(project.image_url || "");
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this project?")) {
            await deleteProject(id);
        }
    };

    if (loading) {
        return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;
    }

    const inputClass = "bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white";

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects Management</h2>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                </Button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {editing ? "Edit Project" : "Add New Project"}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            placeholder="Project Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={inputClass}
                            required
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                    Project Year
                                </label>
                                <select
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className={`w-full px-3 py-2 rounded-md border ${inputClass}`}
                                    required
                                >
                                    <option value="">Select Year</option>
                                    {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                        <option key={year} value={`${year}-01-01`}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                                    Location
                                </label>
                                <Input
                                    placeholder="Location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className={inputClass}
                                    required
                                />
                            </div>
                        </div>
                        <Textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className={inputClass}
                            rows={4}
                            required
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                Project Image
                            </label>

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="relative mb-3">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-lg border border-gray-300 dark:border-slate-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            {/* File Upload */}
                            <div className="flex gap-2">
                                <label className="flex-1 cursor-pointer">
                                    <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg hover:border-indigo-500 transition-colors">
                                        <Upload className="w-5 h-5 text-gray-600 dark:text-slate-400" />
                                        <span className="text-sm text-gray-600 dark:text-slate-400">
                                            {imageFile ? imageFile.name : "Choose image from device"}
                                        </span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            {/* Or use URL */}
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 dark:text-slate-500 mb-1">Or paste image URL:</p>
                                <Input
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.image_url}
                                    onChange={(e) => {
                                        setFormData({ ...formData, image_url: e.target.value });
                                        if (e.target.value) {
                                            setImagePreview(e.target.value);
                                            setImageFile(null);
                                        }
                                    }}
                                    className={inputClass}
                                />
                            </div>

                            <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                                Max size: 5MB. Supported: JPG, PNG, GIF, WebP
                            </p>
                        </div>
                        <Input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            placeholder="Rate (0-5)"
                            value={formData.rate}
                            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                            className={inputClass}
                        />
                        <div className="flex gap-2">
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={submitting || uploading}>
                                {(submitting || uploading) ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                {uploading ? "Uploading..." : editing ? "Update" : "Add"} Project
                            </Button>
                            <Button type="button" variant="outline"
                                className="border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 bg-white dark:bg-transparent"
                                onClick={resetForm}>Cancel</Button>
                        </div>
                    </form>
                </div>
            )}

            {projects.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
                    <FolderKanban className="w-16 h-16 text-gray-400 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-slate-400 mb-2">No projects yet</p>
                    <p className="text-sm text-gray-500 dark:text-slate-500">Click "Add Project" to create your first project</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-3 gap-4">
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 dark:text-white break-words">{project.name}</h4>
                                    <p className="text-sm text-gray-600 dark:text-slate-400 break-words">{project.location} • {project.date?.split('-')[0]}</p>
                                </div>
                                <div className="flex gap-2 flex-shrink-0">
                                    <Button size="sm" variant="ghost"
                                        className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                                        onClick={() => handleEdit(project)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="ghost"
                                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                                        onClick={() => handleDelete(project.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mb-2 break-words whitespace-normal">{project.description}</p>
                            <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400">
                                <span className="font-semibold">Rate: {project.rate}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
