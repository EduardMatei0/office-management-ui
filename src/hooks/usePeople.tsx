import {PeopleResponse} from "../model/PeopleResponse";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import ApiClient from "../services/ApiClient";
import toast from "react-hot-toast";


const usePeople = (): [PeopleResponse[], Dispatch<SetStateAction<PeopleResponse[]>>] => {
    const api = new ApiClient();
    const [people, setPeople] = useState<PeopleResponse[]>([]);

    useEffect(() => {
        const fetchPeopleList = async () => {
            const list = await api.getAllPeople();
            setPeople(list);
        };
        toast.promise(fetchPeopleList(), {
            loading: 'Getting people...',
            success: 'People retrieved..',
            error: 'An error has occured'
        });
    }, []);

    return [people, setPeople];
}

export default usePeople;
