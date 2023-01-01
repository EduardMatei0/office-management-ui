import {PeopleResponse} from "../model/PeopleResponse";
import React,{useContext} from "react";

export const PeopleContext = React.createContext<PeopleResponse[]>([]);
export const usePeopleContext = () => useContext(PeopleContext);
