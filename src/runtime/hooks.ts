import { useContext, createContext } from 'react';
import { PageData } from 'shared/types';

export const DataContext = createContext({} as PageData);

export const usePageData = () => useContext(DataContext);
