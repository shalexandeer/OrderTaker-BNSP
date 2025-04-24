import { IonSearchbar } from "@ionic/react";
import React, { useState } from "react";
import "./SearchBar.module.css";

interface SearchBarProps {
  isSearching: (isSearching: boolean) => void;
  handleSearchText: (searchText: string) => void;
}

const SearchBar = ({ isSearching, handleSearchText }: SearchBarProps) => {
  const [onFocus, setOnFocus] = useState(false);
  const [searchText, setSearchText] = useState("" as string);

  return (
    <div className="relative flex items-center space-x-2 px-5">
      <input
        onFocus={() => {
          isSearching(true);
          setOnFocus(true);
        }}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          handleSearchText(e.target.value);
        }}
        placeholder="Looking for something?"
        className="h-[40px] w-full rounded-full border  border-[--ion-stroke-color] bg-[--ion-item-bg] px-5  text-sm transition-all duration-500"
      />
      <h1
        onClick={() => {
          isSearching(false);
          setOnFocus(false);
          setSearchText("");
          handleSearchText("");
        }}
        className={`
        cursor-pointer text-[--ion-color-primary] transition-all duration-300
          ${onFocus ? "relative right-0" : "absolute right-[-100px]"}
        `}
      >
        cancel
      </h1>
    </div>
  );
};

export default SearchBar;
