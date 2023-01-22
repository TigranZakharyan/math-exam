export interface Book {
  id?: number;
  title?: string;
  description?: string;
  author?: string;
  file?: Express.Multer.File;
  preview?: Express.Multer.File;
}
