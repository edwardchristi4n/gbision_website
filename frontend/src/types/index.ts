// Shared TypeScript types — harus selalu sync dengan Pydantic schema di backend
export interface Pastor { id: number; name: string; title: string; bio: string; photo_url: string; order: number }
export interface Program { id: number; title: string; description: string; schedule: string; location: string; image_url?: string; is_active: boolean; created_at: string }
export interface BlogPost { id: number; title: string; slug: string; content: string; excerpt: string; cover_url?: string; is_published: boolean; published_at: string }
export interface Announcement { id: number; title: string; content: string; is_pinned: boolean; created_at: string }
export interface GalleryItem { id: number; title: string; image_url: string; album: string }
export interface Schedule { id: number; name: string; day_of_week: number; time_start: string; time_end: string; location: string }
export interface AdminUser { id: number; name: string; email: string; role: 'superadmin' | 'admin'; created_at: string }
export interface PaginatedResponse<T> { items: T[]; total: number; page: number; pages: number }
