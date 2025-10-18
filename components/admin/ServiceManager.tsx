import { useState, useEffect } from "react";
import { serviceStore, Service } from "../../src/data/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Plus, Pencil, Trash2, Briefcase } from "lucide-react";

interface ServiceManagerProps {
    onUpdate?: () => void;
}

export function ServiceManager({ onUpdate }: ServiceManagerProps) {
    const [services, setServices] = useState<Service[]>([]);
    const [editing, setEditing] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        icon: "",
        title: "",
        description: "",
        features: "",
        stats: ""
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setServices(serviceStore.getAll());
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const serviceData = {
            icon: formData.icon,
            title: formData.title,
            description: formData.description,
            features: formData.features.split("\n").filter(f => f.trim()),
            stats: formData.stats
        };
        if (editing) {
            serviceStore.update(editing, serviceData);
        } else {
            serviceStore.add(serviceData);
        }
        setServices(serviceStore.getAll());
        setFormData({ icon: "", title: "", description: "", features: "", stats: "" });
        setEditing(null);
        setShowForm(false);
        onUpdate?.();
    };

    const handleEdit = (service: Service) => {
        setEditing(service.id);
        setFormData({
            icon: service.icon,
            title: service.title,
            description: service.description,
            features: service.features.join("\n"),
            stats: service.stats || ""
        });
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Delete this service?")) {
            serviceStore.delete(id);
            setServices(serviceStore.getAll());
            onUpdate?.();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services Management</h2>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                placeholder="Icon name (e.g., Sun, Zap, Battery)"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                                required
                            />
                            <Input
                                placeholder="Service Title (e.g., Solar PV Systems)"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                        <Textarea
                            placeholder="Service Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                            rows={3}
                            required
                        />
                        <Textarea
                            placeholder="Features (one per line)&#10;e.g.:&#10;On-grid and off-grid solar systems&#10;Rooftop and ground-mounted installations"
                            value={formData.features}
                            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                            className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                            rows={4}
                            required
                        />
                        <Input
                            placeholder="Stats (optional, e.g., 500+ kW Installed)"
                            value={formData.stats}
                            onChange={(e) => setFormData({ ...formData, stats: e.target.value })}
                            className="bg-gray-50 dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white"
                        />
                        <div className="flex gap-2">
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                                {editing ? "Update" : "Add"} Service
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700 bg-white dark:bg-transparent"
                                onClick={() => {
                                    setEditing(null);
                                    setFormData({ icon: "", title: "", description: "", features: "", stats: "" });
                                    setShowForm(false);
                                }}
                            >
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
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-indigo-600 transition-all shadow-sm hover:shadow-md"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center">
                                    <Briefcase className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                                        onClick={() => handleEdit(service)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                                        onClick={() => handleDelete(service.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">{service.description}</p>

                            {service.features && service.features.length > 0 && (
                                <ul className="space-y-2 mb-4">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-400">
                                            <span className="text-indigo-600 dark:text-indigo-500 mt-1">✓</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {service.stats && (
                                <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{service.stats}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
