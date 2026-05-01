import { KnowledgeBaseService } from './knowledge-base.service';
export declare class KnowledgeBaseController {
    private knowledgeBaseService;
    constructor(knowledgeBaseService: KnowledgeBaseService);
    findAll(category?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
        category: string | null;
        priority: number;
        isActive: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
        category: string | null;
        priority: number;
        isActive: boolean;
    } | null>;
    create(dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
        category: string | null;
        priority: number;
        isActive: boolean;
    }>;
    update(id: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
        category: string | null;
        priority: number;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
        category: string | null;
        priority: number;
        isActive: boolean;
    }>;
}
