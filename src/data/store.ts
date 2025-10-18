// Simple data store using localStorage
export interface Service {
    id: string;
    icon: string;
    title: string;
    description: string;
    features: string[];
    stats?: string;
}

export interface Project {
    id: string;
    name: string;
    date: string;
    location: string;
    description: string;
    image: string;
    rate: string;
}

export interface Testimonial {
    id: string;
    rating: number;
    description: string;
    role: string;
    location: string;
}

const STORAGE_KEYS = {
    services: 'tamarsan_services',
    projects: 'tamarsan_projects',
    testimonials: 'tamarsan_testimonials',
};

// Generic storage functions
export const storage = {
    get: <T>(key: string, defaultValue: T): T => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },
    set: <T>(key: string, value: T): void => {
        localStorage.setItem(key, JSON.stringify(value));
    },
};

// Service operations
export const serviceStore = {
    getAll: (): Service[] => storage.get(STORAGE_KEYS.services, []),
    save: (services: Service[]) => storage.set(STORAGE_KEYS.services, services),
    add: (service: Omit<Service, 'id'>) => {
        const services = serviceStore.getAll();
        const newService = { ...service, id: Date.now().toString() };
        serviceStore.save([...services, newService]);
        return newService;
    },
    update: (id: string, service: Partial<Service>) => {
        const services = serviceStore.getAll();
        const updated = services.map(s => s.id === id ? { ...s, ...service } : s);
        serviceStore.save(updated);
    },
    delete: (id: string) => {
        const services = serviceStore.getAll().filter(s => s.id !== id);
        serviceStore.save(services);
    },
};

// Project operations
export const projectStore = {
    getAll: (): Project[] => storage.get(STORAGE_KEYS.projects, []),
    save: (projects: Project[]) => storage.set(STORAGE_KEYS.projects, projects),
    add: (project: Omit<Project, 'id'>) => {
        const projects = projectStore.getAll();
        const newProject = { ...project, id: Date.now().toString() };
        projectStore.save([...projects, newProject]);
        return newProject;
    },
    update: (id: string, project: Partial<Project>) => {
        const projects = projectStore.getAll();
        const updated = projects.map(p => p.id === id ? { ...p, ...project } : p);
        projectStore.save(updated);
    },
    delete: (id: string) => {
        const projects = projectStore.getAll().filter(p => p.id !== id);
        projectStore.save(projects);
    },
};

// Testimonial operations
export const testimonialStore = {
    getAll: (): Testimonial[] => storage.get(STORAGE_KEYS.testimonials, []),
    save: (testimonials: Testimonial[]) => storage.set(STORAGE_KEYS.testimonials, testimonials),
    add: (testimonial: Omit<Testimonial, 'id'>) => {
        const testimonials = testimonialStore.getAll();
        const newTestimonial = { ...testimonial, id: Date.now().toString() };
        testimonialStore.save([...testimonials, newTestimonial]);
        return newTestimonial;
    },
    update: (id: string, testimonial: Partial<Testimonial>) => {
        const testimonials = testimonialStore.getAll();
        const updated = testimonials.map(t => t.id === id ? { ...t, ...testimonial } : t);
        testimonialStore.save(updated);
    },
    delete: (id: string) => {
        const testimonials = testimonialStore.getAll().filter(t => t.id !== id);
        testimonialStore.save(testimonials);
    },
};
