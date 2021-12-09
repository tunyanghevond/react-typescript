import { createContext, useReducer } from "react";
import { IState } from "../interfaces";
import reducer from "./reducer";

const initialState: IState = {
  episodes: [],
  favourites: [],
};

export const Store = createContext<IState | any>(initialState);

export const StoreProvider = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
};
