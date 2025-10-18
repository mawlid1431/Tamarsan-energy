import { useState } from "react";
import { useServices } from "../../src/hooks/useServices";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Plus, Pencil, Trash2, Briefcase, Loader2, Sun, Zap, Battery, Lightbulb, Settings, Wrench, Wind, Cpu, Power, Gauge } from "lucide-react";

export function ServiceManager() {
    const { services, loading, addService, updateService, deleteService } = useServices();
    const [editing, setEditing] = useState<string | null>(null);
    const [formData, setFormData] = useState({ title: "", description: "", icon: "Sun" });
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Available icons for services
    const availableIcons = [
        { name: "Sun", label: "Solar/Sun" },
        { name: "Zap", label: "Energy/Lightning" },
        { name: "Battery", label: "Battery" },
        { name: "Lightbulb", label: "Light Bulb" },
        { name: "Settings", label: "Settings/Gear" },
        { name: "Wrench", label: "Wrench/Tools" },
        { name: "Wind", label: "Wind" },
        { name: "Cpu", label: "Technology" },
        { name: "Power", label: "Power" },
        { name: "Gauge", label: "Gauge/Monitor" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        if (editing) {
            await updateService(editing, formData);
        } else {
            await addService(formData);
        }

        setFormData({ title: "", description: "", icon: "Sun" });
        setEditing(null);
        setShowForm(false);
        setSubmitting(false);
    };

    const handleEdit = (service: any) => {
        setEditing(service.id);
        setFormData({ title: service.title, description: service.description, icon: service.icon || "Sun" });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this service?")) {
            await deleteService(id);
        }
    };

    if (loading) {
        return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-indigo-600" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services Management</h2>
                <Button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                </Button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {editing ? "Edit Service" : "Add New Service"}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            placeholder="Service Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                            required
                        />
                        <Textarea
                            placeholder="Service Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                            rows={4}
                            required
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                Select Icon
                            </label>
                            <div className="grid grid-cols-5 gap-3">
                                {availableIcons.map((iconOption) => {
                                    const IconComponent = iconOption.name === "Sun" ? Sun :
                                        iconOption.name === "Zap" ? Zap :
                                            iconOption.name === "Battery" ? Battery :
                                                iconOption.name === "Lightbulb" ? Lightbulb :
                                                    iconOption.name === "Settings" ? Settings :
                                                        iconOption.name === "Wrench" ? Wrench :
                                                            iconOption.name === "Wind" ? Wind :
                                                                iconOption.name === "Cpu" ? Cpu :
                                                                    iconOption.name === "Power" ? Power :
                                                                        iconOption.name === "Gauge" ? Gauge : Sun;

                                    return (
                                        <button
                                            key={iconOption.name}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, icon: iconOption.name })}
                                            className={`p-3 rounded-lg border-2 transition-all ${formData.icon === iconOption.name
                                                ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950"
                                                : "border-gray-300 dark:border-slate-600 hover:border-indigo-400"
                                                }`}
                                            title={iconOption.label}
                                        >
                                            <IconComponent className={`w-6 h-6 mx-auto ${formData.icon === iconOption.name
                                                ? "text-indigo-600 dark:text-indigo-400"
                                                : "text-gray-600 dark:text-slate-400"
                                                }`} />
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">
                                Selected: {availableIcons.find(i => i.name === formData.icon)?.label}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={submitting}>
                                {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                {editing ? "Update" : "Add"} Service
                            </Button>
                            <Button type="button" variant="outline"
                                className="border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 bg-white dark:bg-transparent"
                                onClick={() => { setEditing(null); setFormData({ title: "", description: "", icon: "Sun" }); setShowForm(false); }}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {services.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm">
                    <Briefcase className="w-16 h-16 text-gray-400 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-slate-400 mb-2">No services yet</p>
                    <p className="text-sm text-gray-500 dark:text-slate-500">Click "Add Service" to create your first service</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service) => {
                        const ServiceIcon = service.icon === "Sun" ? Sun :
                            service.icon === "Zap" ? Zap :
                                service.icon === "Battery" ? Battery :
                                    service.icon === "Lightbulb" ? Lightbulb :
                                        service.icon === "Settings" ? Settings :
                                            service.icon === "Wrench" ? Wrench :
                                                service.icon === "Wind" ? Wind :
                                                    service.icon === "Cpu" ? Cpu :
                                                        service.icon === "Power" ? Power :
                                                            service.icon === "Gauge" ? Gauge : Sun;

                        return (
                            <div key={service.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-indigo-600 transition-all shadow-sm hover:shadow-md">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center">
                                        <ServiceIcon className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="ghost" className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white" onClick={() => handleEdit(service)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300" onClick={() => handleDelete(service.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-slate-400">{service.description}</p>
                                <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2">Icon: {service.icon}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
