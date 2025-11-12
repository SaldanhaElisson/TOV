import React, { FC } from 'react';
import FilePreview from './FilePreview'; // O componente que acabamos de tipar
import { Label } from '@/web/components/ui/label';
import { Input } from '@/web/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/web/components/ui/card';
import { Button } from '@/web/components/ui/button';
import { FileData } from '@/web/types';
import { ExperimentSettings } from '@/web/components/experiment/create/ExperimentSettings';
import { useFileUploader } from '@/web/hook/useFileUploader';
import { InformationsAboutEyeTracking } from './InformationsAboutEyeTracking';

interface CreateExperimentProps {
  handleSetupComplete: () => void
  fileList: FileData[];
  setFileList: React.Dispatch<React.SetStateAction<FileData[]>>;
  setIsFreeTime: React.Dispatch<React.SetStateAction<boolean>>
  setIsRandom: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateExperiment: FC<CreateExperimentProps> = ({ handleSetupComplete, fileList, setFileList, setIsRandom, setIsFreeTime }) => {

  const MAX_PREVIEWS = 12;

  const {
    handleFileChange,
    handleRemoveFile
  } = useFileUploader({ setFileList });

  return (
    <div>
      <div className='h-screen flex justify-center items-center'>

        <Card className="text-white w-96 border rounded-lg">

          <CardHeader >
            <CardTitle className="items-start text-2xl font-bold"> TOV </CardTitle>
          </CardHeader>

          <CardContent className='flex flex-col gap-5'>

            <div>
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
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {fileList
                    .slice(0, MAX_PREVIEWS)
                    .map((item) => (
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
            </div>

            <ExperimentSettings setIsRandom={setIsRandom} setIsFreeTime={setIsFreeTime} />
          </CardContent>

          <CardFooter className='flex'>
            <Button className='w-full' onClick={handleSetupComplete}> Iniciar </Button>
          </CardFooter>
        </Card>

      </div>

      <InformationsAboutEyeTracking />
    </div>
  );
}

export default CreateExperiment;