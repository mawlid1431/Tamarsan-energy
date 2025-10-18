import { useState, useEffect } from "react";
import { projectStore, Project } from "../../src/data/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Plus, Pencil, Trash2, FolderKanban } from "lucide-react";

interface ProjectManagerProps {
    onUpdate?: () => void;
}

export function ProjectManager({ onUpdate }: ProjectManagerProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editing, setEditing] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        location: "",
        description: "",
        image: "",
        rate: ""
    });

    useEffect(() => {
        setProjects(projectStore.getAll());
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            projectStore.update(editing, formData);
        } else {
            projectStore.add(formData);
        }
        setProjects(projectStore.getAll());
        resetForm();
        onUpdate?.();
    };

    const resetForm = () => {
        setFormData({
            name: "",
            date: "",
            location: "",
            description: "",
            image: "",
            rate: ""
        });
        setEditing(null);
        setShowForm(false);
    };

    const handleEdit = (project: Project) => {
        setEditing(project.id);
        setFormData({ ...project });
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Delete this project?")) {
            projectStore.delete(id);
            setProjects(projectStore.getAll());
            onUpdate?.();
        }
    };

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
                            <Input
                                placeholder="Date (e.g., 2023-2024)"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                        <Textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className={inputClass}
                            rows={4}
                            required
                        />
                        <Input
                            placeholder="Image URL"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className={inputClass}
                            required
                        />
                        <Input
                            placeholder="Rate (e.g., 5/5, 4.5 stars)"
                            value={formData.rate}
                            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                            className={inputClass}
                            required
                        />
                        <div className="flex gap-2">
                            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                                {editing ? "Update" : "Add"} Project
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
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                                    <p className="text-sm text-gray-600 dark:text-slate-400">{project.location} • {project.date}</p>
                                </div>
                                <div className="flex gap-2">
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
                            <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">{project.description}</p>
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
