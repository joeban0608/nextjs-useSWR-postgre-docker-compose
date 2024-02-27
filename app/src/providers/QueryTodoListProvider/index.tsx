import { Category } from "@/types/task";
import React, { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";

type QueryTodoListProviderProps = {
  queryParams: string;
  queryName: string;
  queryJob: string;
  queryCategory: Category | "";
  setQueryName: React.Dispatch<React.SetStateAction<string>>;
  setQueryJob: React.Dispatch<React.SetStateAction<string>>;
  setQueryCategory: React.Dispatch<React.SetStateAction<Category | "">>;
};
export const QueryTodoListContext = createContext<QueryTodoListProviderProps>({
  queryParams: "",
  queryName: "",
  queryJob: "",
  queryCategory: "",
  setQueryName: () => {},
  setQueryJob: () => {},
  setQueryCategory: () => {},
});

const QueryTodoListProvider = ({ children }: { children: ReactNode }) => {
  const [queryName, setQueryName] = useState("");
  const [queryJob, setQueryJob] = useState("");
  const [queryCategory, setQueryCategory] = useState<Category | "">("");
  const [queryParams, setQueryParams] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (queryCategory) {
      queryParams.append("category", queryCategory);
    }
    if (queryName) {
      queryParams.append("name", queryName);
    }
    if (queryJob) {
      queryParams.append("job", queryJob);
    }
    if (queryJob || queryName || queryCategory) {
      const url = `?${queryParams.toString()}`;
      setQueryParams(url);
    }
    // mutate(["/tasks", "query"]);
  }, [queryCategory, queryName, queryJob]);

  useEffect(() => {
    console.log("queryParams in provider", queryParams);
  }, [queryParams]);
  const values = {
    queryParams,
    queryName,
    queryJob,
    queryCategory,
    setQueryName,
    setQueryJob,
    setQueryCategory,
  };

  return (
    <QueryTodoListContext.Provider value={values}>
      {children}
    </QueryTodoListContext.Provider>
  );
};

export default QueryTodoListProvider;
