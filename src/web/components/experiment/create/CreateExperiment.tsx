import React, { useState, FC } from 'react';
import FilePreview from './FilePreview'; // O componente que acabamos de tipar
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { FileData } from '@/web/types';



interface CreateExperimentProps {
  handleSetupComplete: () => void
  fileList: FileData[];
  setFileList: React.Dispatch<React.SetStateAction<FileData[]>>;
}

const CreateExperiment: FC<CreateExperimentProps> = ({handleSetupComplete, fileList, setFileList}) => {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            const newFileItem: FileData = {
              id: `${file.name}-${Date.now()}-${Math.random()}`,
              name: file.name,
              url: reader.result,
              file: file,
            };

            setFileList((prev) => [...prev, newFileItem]);
          }
        };
        reader.readAsDataURL(file);
      });

      event.target.value = ''; 
    }
  };


  const handleRemoveFile = (idToRemove: string) => {
    
    setFileList(prev => prev.filter(item => item.id !== idToRemove));
  };

  
  return (
    <div className='w-screen h-screen flex justify-center items-center'> 
        <Card className="text-white w-96 border rounded-lg">

            <CardHeader >
                <CardTitle className="justify-center items-center text-center text-2xl font-bold">TOV</CardTitle>
            </CardHeader>

            <CardContent>
                <Label htmlFor="picture" className="scroll-m-20 text-sm font-semibold tracking-tight mb-4">
                    Imagens do Experimento
                </Label>
                
                <Input 
                    id="picture" 
                    type="file" 
                    multiple 
                    onChange={handleFileChange} 
                    className="mb-4"
                />

                {fileList.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                    {fileList.map((item) => (
                        <FilePreview 
                        key={item.id} 
                        url={item.url} 
                        name={item.name} 
                    
                        onRemove={() => handleRemoveFile(item.id)} 
                        />
                    ))}
                    </div>
                )}
                
                {fileList.length === 0 && (
                    <p className="text-sm text-gray-400">Nenhuma imagem selecionada. Clique para adicionar.</p>
                )}
        </CardContent>

        <CardFooter className='flex'>
            <Button className='w-full' onClick={handleSetupComplete}> Iniciar </Button>
        </CardFooter>
        </Card>
    </div>
  );
}

export default CreateExperiment;