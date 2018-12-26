import { Metadata } from 'grpc';

export type MetadataCallback = (error: Error | null, metadata?: Metadata) => void;
