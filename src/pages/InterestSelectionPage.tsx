import React, { useState, useEffect } from 'react';
import { IoCheckbox } from 'react-icons/io5';
import interestsData from '../data/data.json';
import axios from 'axios';
import { RootState } from '../redux/store/store';
import { useSelector } from 'react-redux';

interface Interest {
  name: string;
  checked: boolean;
}

const itemsPerPage = 6;

const InterestsForm: React.FC = () => {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { user } = useSelector((state: RootState) => state.auth);

  // Load initial interests and user's saved interests
  useEffect(() => {
    const initializeInterests = async () => {
      setInterests(interestsData); // Initialize with JSON data

      if (user) {
        try {
          const response = await axios.get(`http://localhost:3000/api/auth/get-interests/${user._id}`);
          const userInterests = response.data.interests; // Assuming this is an array of interest names

          // Update interests based on user's saved interests
          const updatedInterests = interestsData.map((interest) => ({
            ...interest,
            checked: userInterests.includes(interest.name), // Set checked based on user's interests
          }));

          setInterests(updatedInterests);
        } catch (error) {
          console.error('Error fetching user interests:', error);
        }
      }
    };

    initializeInterests();
  }, [user]);

  const handleCheckboxChange = async (index: number) => {
    const updatedInterests = interests.map((interest, i) =>
      i === index ? { ...interest, checked: !interest.checked } : interest
    );

    setInterests(updatedInterests);

    const selectedInterests = updatedInterests
      .filter(interest => interest.checked)
      .map(interest => interest.name);

    try {
      await axios.post('http://localhost:3000/api/auth/add-interest', {
        userId: user?._id,
        interests: selectedInterests,
      });
      console.log('Interests updated successfully');
    } catch (error) {
      console.error('Error updating interests:', error);
    }
  };

  // Pagination logic
  const paginatedInterests = interests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-6">
      <div className="border p-10 rounded-md max-w-lg mx-auto m-12">
        <h2 className="text-3xl font-medium text-center mb-4">
          Please mark your interests!
        </h2>
        <div>
          <h3 className="font-medium mb-4 text-gray-700">My saved interests!</h3>
          <ul>
            {paginatedInterests.map((interest, index) => (
              <li key={index} className="mb-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={interest.checked}
                      onChange={() => handleCheckboxChange((currentPage - 1) * itemsPerPage + index)}
                      className="hidden"
                    />
                    {interest.checked ? (
                      <IoCheckbox className="w-5 h-5 text-gray-700" />
                    ) : (
                      <div className="w-4 h-4 rounded-sm bg-gray-300 mx-0.5"></div>
                    )}
                  </div>
                  <span className="font-light text-sm">{interest.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex justify-center items-center text-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(interests.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePages = 7;

  const getVisiblePages = () => {
    const pageNumbers: (number | string)[] = [];

    if (totalPages > visiblePages) {
      pageNumbers.push(1);
      if (currentPage > Math.floor(visiblePages / 2) + 1) {
        pageNumbers.push('...');
      }
      const startPage = Math.max(2, currentPage - Math.floor(visiblePages / 2));
      const endPage = Math.min(totalPages - 1, startPage + visiblePages - 3);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - Math.floor(visiblePages / 2)) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="w-1/2 flex justify-center items-center space-x-1 text-gray-600 pt-8">
      <button
        className="text-gray-400 hover:text-black"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;&lt;
      </button>

      {getVisiblePages().map((pageNumber, index) => (
        <div key={index}>
          {pageNumber === '...' ? (
            <button className="px-1 py-1 text-gray-400">...</button>
          ) : (
            <button
              className={`px-1 py-1 ${currentPage === pageNumber ? 'text-black font-bold' : 'text-gray-400'}`}
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </button>
          )}
        </div>
      ))}

      <button
        className="text-gray-400 hover:text-black"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default InterestsForm;