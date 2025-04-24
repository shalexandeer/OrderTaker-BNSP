import { useNavigate, useSearchParams } from "react-router-dom";

export function toCamelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/(?:^|[^a-zA-Z0-9]+)(.)/g, (chr, index) => index === 0 ? chr.toLowerCase() : chr.toUpperCase());
}

export function useHandleParams() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleParams = (orderBy: string, isAscending: boolean) => {
    searchParams.set('isAscending', isAscending.toString());
    searchParams.set('orderBy', orderBy);
    setSearchParams(searchParams);
    navigate(`${window.location.pathname}?${searchParams.toString()}`);
  };

  return handleParams;
}

export  const getDirtyFields = (dirtyFields: any, allValues: any) => {
  const dirtyData: any = {};
  for (const key in dirtyFields) {
    if (dirtyFields[key] === true) {
      dirtyData[key] = allValues[key];
    } else if (typeof dirtyFields[key] === 'object') {
      dirtyData[key] = getDirtyFields(dirtyFields[key], allValues[key]);
    }
  }
  return dirtyData;
};