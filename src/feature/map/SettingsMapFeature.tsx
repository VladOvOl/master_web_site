import React, { useEffect, useState } from 'react'
import FormFilter from '../../components/form_filter/FormFilter';
import { useOutletContext } from 'react-router';
import type { ILocationTypes, IOutletContext } from './CreatePointFeature';
import { getAllLocationTypes } from '../../service/location_type.service';
import { getAllServiceTypes } from '../../service/service_type.service';
import type { IQuery } from './MapFeature';

type IOutletContext = {
    queryParam: IQuery,
    setQueryParam: React.Dispatch<React.SetStateAction<IQuery>>
};

const SettingsMapFeature = () => {
    const [loading, setLoading] = useState(false);
    const {queryParam,setQueryParam} =useOutletContext<IOutletContext>();
    const [typeLocations, setTypeLocations] = useState<ILocationTypes[]>([]);

    useEffect(() => {
        getAllTypesLocation();
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


    return (
        <div style={{ width: "100%", height: "100%" }}>
            <FormFilter
                loading={loading}
                typeLocations={typeLocations}
                queryParam={queryParam}
                setQueryParam={setQueryParam}
            />
        </div>
    );
};


export default SettingsMapFeature