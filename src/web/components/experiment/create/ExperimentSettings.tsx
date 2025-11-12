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
                <Label htmlFor="isRandomTrial"> Apresentar imagens em ordem aleatória. </Label>
            </div>


            <div className="flex gap-4">
                <Checkbox id="isFreeTime" onCheckedChange={(value) => {

                    console.log(value)
                    if (value !== "indeterminate") {
                        console.log("valor indeter", value)
                        setIsFreeTime(value)
                    }
                }} />

                <Label htmlFor="isFreeTime"> Tempo de observação livre. </Label>
            </div>

        </div >
    )
}
