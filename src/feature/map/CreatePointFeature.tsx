import { useOutletContext } from "react-router";
import FormCreatePoint from "../../components/form_create_point/FormCreatePoint";
import { createDraftPhoto } from "../../service/photo.service";
import { useEffect, useState } from "react";
import type { INewPoint } from "../../components/map/Map";
import { getAllLocationTypes } from "../../service/location_type.service";
import { getAllServiceTypes } from "../../service/service_type.service";
import { createAidPoint } from "../../service/map.service";

export type ILocationTypes = {
    code: string;
    description: string;
    id: number;
    name: string;
    smsCode: string;
};

export type IServiceTypes = {
    id: number,
    code: string,
    smsCode: string,
    name: string,
    description: string
};

type IOutletContext = {
    newPoint: INewPoint;
    selectingPoint: boolean;
    setSelectingPoint: React.Dispatch<React.SetStateAction<boolean>>;
    getAidPoints: () => Promise<void>
};

const CreatePointFeature = () => {
    const [loading, setLoading] = useState(false);
    const { setSelectingPoint, selectingPoint, newPoint, getAidPoints } =
        useOutletContext<IOutletContext>();
    const [typeLocations, setTypeLocations] = useState<ILocationTypes[]>([]);
    const [typeServices, setTypeServices] = useState<ILocationTypes[]>([]);
    const [draftPhotoIds,setDraftPhotoIds] = useState<number[]>([])

    useEffect(() => {
        getAllTypesLocation();
        getAllTypesService();
    }, []);

    /* */

    const getAllTypesLocation = async () => {
        try {
            const response = await getAllLocationTypes();
            setTypeLocations(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllTypesService = async () => {
        try {
            const response = await getAllServiceTypes();
            setTypeServices(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    const sendPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) return;

            const file = e.target.files[0];

            const formData = new FormData();
            formData.append("image", file);

            setLoading(true);
            const response = await createDraftPhoto(formData);

            setDraftPhotoIds([...draftPhotoIds,response.data.draftPhotoId])
        } catch (err) {
            console.error("Upload error:", err);
        } finally {
            setLoading(false);
        }
    };

    const createNewPoint = async(body) => {
        try {
            setLoading(true);
            const response = await createAidPoint(body)
            console.log(response)
            getAidPoints()
        } catch (error) {
            console.warn(error)
        }finally{
            setLoading(false);
        }
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <FormCreatePoint
                setSelectingPoint={setSelectingPoint}
                loading={loading}
                sendPhoto={sendPhoto}
                selectingPoint={selectingPoint}
                newPoint={newPoint}
                typeLocations={typeLocations}
                typeServices={typeServices}
                draftPhotoIds={draftPhotoIds}
                createNewPoint={createNewPoint}
            />
        </div>
    );
};

export default CreatePointFeature;
