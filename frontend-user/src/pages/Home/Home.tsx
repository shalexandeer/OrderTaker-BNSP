import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IonContent, IonPage, IonSpinner, IonToast } from "@ionic/react";

import { SearchBar, RestaurantPageList } from "../../components";
import {
  MaterialSymbolsWbSunnyOutline,
  SolarMoonLinear,
} from "../../components/elements/Icons/IconLibrary";

import { setDarkMode } from "../../stores/ui";
import { RootState, useTypedDispatch, useTypedSelector } from "../../stores";
import "./Home.module.css";
import IonFabCart from "../../components/elements/IonFab/IonFabCart";
import { useGetFoods, useSearchFoods } from "../../services/foods/foods.query";
import { useGetFoodCategories } from "../../services/category/category.query";
import SearchItem from "./components/SearchItem";
import useDebounce from "../../hooks/useDebounce"; // Import your useDebounce hook

const Home: React.FC = memo(() => {
  const { dark } = useSelector((state: RootState) => state.ui);
  const { user, mejaData, restaurantProfile } = useTypedSelector(
    ({ user }) => user,
  );

  const dispatch = useTypedDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const debouncedSearchText = useDebounce(searchText, 300);

  const handleIsSearching = (isSearching: boolean) => {
    setTimeout(() => {
      setIsSearching(isSearching);
    }, 300);
  };

  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle("dark", shouldAdd);
    dispatch(setDarkMode(shouldAdd));
  };

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    prefersDark.addEventListener("change", (mediaQuery) => {
      toggleDarkTheme(mediaQuery.matches);
    });
  }, []);

  const {
    data: foodsData,
    isFetching: isFetchingFoods,
    isError: errorFoods,
  } = useGetFoods(selectedCategory!);

  const { data: searchFoodsData, isFetching: isFetchingSearchFood } =
    useSearchFoods({
      search: debouncedSearchText,
    });

  const {
    data: category,
    isFetching: isFetchingCategories,
    isError: errorCategory,
  } = useGetFoodCategories(+user?.restaurantId!);

  useEffect(() => {
    if (user == null || mejaData == null || restaurantProfile == null) {
      window.location.replace("/");
    }
  }, [mejaData, restaurantProfile, user]);

  return (
    <IonPage>
      <IonContent fullscreen className="flex flex-col space-y-6">
        <div className="mt-5 flex items-center justify-between px-5">
          <div>
            <p>Hello 👋</p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="capitalize">No. {mejaData?.number}</p>
            <div>
              {dark ? (
                <SolarMoonLinear
                  className="h-6 w-6"
                  onClick={() => toggleDarkTheme(false)}
                />
              ) : (
                <MaterialSymbolsWbSunnyOutline
                  className="h-6 w-6"
                  onClick={() => toggleDarkTheme(true)}
                />
              )}
            </div>
          </div>
        </div>
        <SearchBar
          isSearching={handleIsSearching}
          handleSearchText={(text: string) => setSearchText(text)}
        />
        <div className={`px-5 ${isSearching ? "fade-in px-5" : "hidden"}`}>
          <SearchItem
            searchData={searchFoodsData}
            searchText={debouncedSearchText}
          />
        </div>
        {!isSearching ? (
          <>
            {isFetchingFoods || isFetchingSearchFood || isFetchingCategories ? (
              <div className="flex items-center justify-center">
                <IonSpinner name="crescent" />
              </div>
            ) : errorFoods || errorCategory ? (
              <IonToast
                isOpen={true}
                message="Error fetching data"
                duration={2000}
                color="danger"
              />
            ) : (
              <RestaurantPageList
                foods={foodsData}
                category={category}
                loading={{
                  loadingFood: isFetchingFoods,
                  loadingCategory: isFetchingCategories,
                }}
                selectedCategory={selectedCategory ?? null}
                setSelectedCategory={(id: string | null) => {
                  setSelectedCategory(id);
                }}
              />
            )}
          </>
        ) : null}
      </IonContent>
      <IonFabCart />
    </IonPage>
  );
});

export default Home;
