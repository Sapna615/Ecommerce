import { Search, X, TrendingUp, Clock, Star, Package } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";

// Enhanced trending searches with actual product categories
const trendingSearches = [
  { name: "Classic Plain Cotton Tee", category: "clothing", keywords: ["t-shirt", "cotton", "premium", "shirt"] },
  { name: "Slim Fit Crew Neck Tee", category: "clothing", keywords: ["men", "casual", "tee", "t-shirt"] },
  { name: "Classic Polo Fit Tee", category: "clothing", keywords: ["women", "polo", "t-shirt", "collar"] },
  { name: "Basic Cotton Kids Tee", category: "kids", keywords: ["kids", "basic", "tee", "t-shirt"] },
  { name: "Basic Slim Fit Tee", category: "clothing", keywords: ["basic", "cotton", "tee", "t-shirt"] },
  { name: "Graphic Street Printed Tee", category: "clothing", keywords: ["graphic", "print", "tee", "t-shirt"] },
  { name: "Oversized Drop Shoulder Tee", category: "clothing", keywords: ["oversized", "tee", "t-shirt", "loose"] },
  { name: "Polo Collar Solid Tee", category: "clothing", keywords: ["polo", "collar", "tee", "t-shirt"] }
];

// Enhanced recent searches with better fallback
const getRecentSearches = () => {
  try {
    return JSON.parse(localStorage.getItem('recentSearches') || '[]');
  } catch {
    return ["Classic Plain Cotton Tee", "Slim Fit Crew Neck Tee", "Basic Cotton Kids Tee", "Basic Slim Fit Tee", "Graphic Street Printed Tee"];
  }
};

function SearchComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [recentSearches, setRecentSearches] = useState(getRecentSearches());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchResults, isLoading } = useSelector((state) => state.shopSearch);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSuggestions([]);
    } else if (searchQuery.trim().length >= 2) {
      // Get real search results from API
      const timeoutId = setTimeout(() => {
        dispatch(getSearchResults(searchQuery));
      }, 300);
      
      return () => clearTimeout(timeoutId);
    } else {
      dispatch(resetSearchResults());
    }
  }, [searchQuery, dispatch]);

  // Update filtered suggestions when search results change
  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setFilteredSuggestions(searchResults.slice(0, 5)); // Show top 5 results
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchResults]);

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      // Store in recent searches immediately
      const updatedRecent = [query, ...recentSearches.filter(item => item !== query)].slice(0, 5);
      setRecentSearches(updatedRecent);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
      
      
      navigate(`/shop/search?keyword=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setShowSuggestions(false);
      setSearchQuery("");
      dispatch(resetSearchResults());
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const query = suggestion.title || suggestion.name || suggestion;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleTrendingClick = (trending) => {
    // Use the actual name for search instead of just first keyword
    const searchKeyword = trending.name;
    setSearchQuery(searchKeyword);
    handleSearch(searchKeyword);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredSuggestions([]);
    dispatch(resetSearchResults());
    inputRef.current?.focus();
  };

  const handleCategorySearch = (category) => {
    const categoryKeywords = {
      clothing: "t-shirt tee cotton polo",
      kids: "kids tee t-shirt printed",
      casual: "casual tee t-shirt basic"
    };
    
    const keywords = categoryKeywords[category] || category;
    setSearchQuery(keywords);
    handleSearch(keywords);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search products, brands, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setIsOpen(true);
              setShowSuggestions(true);
            }}
            onKeyPress={handleKeyPress}
            className="pl-10 pr-10 py-2 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Search Suggestions Dropdown */}
      {isOpen && showSuggestions && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto shadow-lg border border-gray-200">
          <CardContent className="p-0">
            {/* Real Search Results/Suggestions */}
            {filteredSuggestions.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  Products
                </h3>
                <div className="space-y-2">
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={suggestion.id || index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <Avatar className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                        {suggestion.image ? (
                          <img 
                            src={suggestion.image} 
                            alt={suggestion.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/100/100/cccccc/666666?text=${suggestion.title?.[0] || 'P'}`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {suggestion.title || suggestion.name}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">{suggestion.category || 'Product'}</span>
                          {suggestion.price && (
                            <>
                              <span className="text-xs text-gray-500">•</span>
                              <span className="text-xs font-semibold text-green-600">${suggestion.price}</span>
                            </>
                          )}
                          {suggestion.averageRating && (
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-500 ml-1">{suggestion.averageRating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="text-center py-2 text-sm text-gray-500">
                      Searching...
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            {searchQuery.trim() === "" && (
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  <h3 className="text-sm font-semibold text-gray-600">Trending Searches</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((trending, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleTrendingClick(trending)}
                      className="text-xs hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700"
                    >
                      {trending.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {searchQuery.trim() === "" && recentSearches.length > 0 && (
              <>
                <Separator />
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <h3 className="text-sm font-semibold text-gray-600">Recent Searches</h3>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((recent, index) => (
                      <div
                        key={index}
                        onClick={() => handleTrendingClick({ name: recent, keywords: [recent] })}
                        className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                      >
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-700">{recent}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Search Tips */}
            {searchQuery.trim() === "" && (
              <>
                <Separator />
                <div className="p-4 bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Search Tips</h3>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Use specific keywords for better results</li>
                    <li>• Try brand names, colors, or sizes</li>
                    <li>• Search by category: "men's shirts", "women's dresses"</li>
                    <li>• Use filters for price range and ratings</li>
                  </ul>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default SearchComponent;
