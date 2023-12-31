import { ChangeEvent, useState } from 'react';
import { Coordinates } from '../../../types/types';
import { Input } from '../ui/Input';

export interface SearchBarProps {
    onLocationSelect: (location: Coordinates, name: string) => void;
    className?: string;
}

const token = process.env.MAPBOX_ACCESS_TOKEN;

const SearchBar = ({ onLocationSelect, className }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);

        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${newSearchTerm}.json?access_token=${token}`
            );
            const data = await response.json();

            if (data.features && data.features.length > 0) {
                setSearchResults(data.features);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error searching for location:', error);
        }
    };

    const handleLocationSelect = (location: Coordinates, name: string) => {
        onLocationSelect(location, name);
        setSearchTerm('');
        setSearchResults([]);
    };

    return (
        <div className={className}>
            <Input type="text" placeholder="Search for a location" value={searchTerm} onChange={handleSearchChange} />

            {searchResults.length > 0 && (
                <ul className="bg-white">
                    {searchResults.map((result: any) => (
                        <li
                            key={result.id}
                            className="cursor-pointer p-3 hover:bg-gray-200"
                            onClick={() =>
                                handleLocationSelect([result.center[1], result.center[0]], result.place_name)
                            }
                        >
                            {result.place_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
