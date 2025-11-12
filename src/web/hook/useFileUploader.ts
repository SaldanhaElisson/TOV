import { FileData } from "@/web/types";

interface UseFileUploaderReturn {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveFile: (idToRemove: string) => void;
}


interface UseFileUploaderProps {
    setFileList: React.Dispatch<React.SetStateAction<FileData[]>>;
}
export const useFileUploader = ({ setFileList }: UseFileUploaderProps): UseFileUploaderReturn => {

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();

                reader.onload = () => {
                    if (typeof reader.result === "string") {
                        const newFileItem: FileData = {
                            id: `${file.name}-${Date.now()}-${Math.random()}`,
                            name: file.name,
                            url: reader.result,
                            file: file,
                        };
                        setFileList((prev) => [...prev, newFileItem]);
                    }
                }
                reader.readAsDataURL(file);
            })

            event.target.value = '';
        }
    }

    const handleRemoveFile = (idToRemove: string) => {
        setFileList(prev => prev.filter(item => item.id !== idToRemove));
    };

    return {
        handleFileChange,
        handleRemoveFile
    }

}