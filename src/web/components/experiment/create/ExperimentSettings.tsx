import { FC } from 'react'
import { Checkbox } from '@/web/components/ui/checkbox'
import { Label } from '@/web/components/ui/label'

interface ExperimentSettingsProps {
    setIsRandom: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFreeTime: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ExperimentSettings: FC<ExperimentSettingsProps> = ({ setIsRandom, setIsFreeTime }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className='flex gap-4'>
                <Checkbox id="isRandomTrial" onCheckedChange={(value) => {

                    if (value !== "indeterminate") {
                        setIsRandom(value)
                    }
                }}
                />
                <Label htmlFor="isRandomTrial">
                    <a href="#random-section" className="border-b tracking-tight"> Apresentar imagens em ordem aleatória. </a>
                </Label>
            </div>


            <div className="flex gap-4">
                <Checkbox id="isFreeTime" onCheckedChange={(value) => {

                    if (value !== "indeterminate") {
                        setIsFreeTime(value)
                    }
                }} />

                <Label htmlFor="isFreeTime">
                    <a href="#observacao-livre-section" className="border-b tracking-tight">Tempo de observação livre.</a>
                </Label>
            </div>

        </div >
    )
}
