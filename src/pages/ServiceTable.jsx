import { useEffect, useState } from "react";
import { Pagination } from "../component/Pagination";
import axios from "axios";
import { Search, X } from "lucide-react";


const BASE_API = "http://20.193.149.47:2242/salons/service/";
const PAGE_SIZE = 100;

export const ServiceTable = () => {

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalServices, setTotalServices] = useState(0);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);
        axios.get(`${BASE_API}?page=${currentPage}`)
            .then((res) => {
                if (!isMounted) return;
                // Handle both array and results property
                const data = Array.isArray(res.data) ? res.data : res.data.results || [];
                setServices(data);
                const total = res.data.totalServices || data.length;
                setTotalServices(total);
                // Use API totalPages if present, else calculate
                setTotalPages(res.data.totalPages || Math.max(1, Math.ceil(total / PAGE_SIZE)));
                setLoading(false);
            })
            .catch(() => {
                if (!isMounted) return;
                setError("Failed to fetch data");
                setLoading(false);
            });
        return () => {
            isMounted = false;
        };
    }, [currentPage]);

    // In-page search (client-side)
    const filteredServices = services.filter(
        (service) =>
            service.service_name &&
            service.service_name.toLowerCase().includes(search.toLowerCase())
    );

    const SkeletonRow = () => (
        <tr className="animate-pulse">
            <td className="w-20 px-3 py-3"><div className="w-12 h-12 bg-btnGrFromLight rounded" /></td>
            <td className="w-36 px-3 py-3"><div className="h-4 w-24 bg-btnGrFromLight rounded" /></td>
            <td className="w-28 px-3 py-3"><div className="h-4 w-20 bg-btnGrFromLight rounded" /></td>
            <td className="w-20 px-3 py-3"><div className="h-4 w-16 bg-btnGrFromLight rounded" /></td>
            <td className="w-60 px-3 py-3"><div className="h-4 w-48 bg-btnGrFromLight rounded" /></td>
            <td className="w-16 px-3 py-3"><div className="h-4 w-12 bg-btnGrFromLight rounded" /></td>
            <td className="w-32 px-3 py-3"><div className="h-4 w-24 bg-btnGrFromLight rounded" /></td>
            <td className="w-24 px-3 py-3"><div className="h-4 w-16 bg-btnGrFromLight rounded" /></td>
            <td className="w-24 px-3 py-3"><div className="h-4 w-16 bg-btnGrFromLight rounded" /></td>
        </tr>
    );

    return (
        <div className="sm:p-10 p-5 gap-4 sm:gap-5 min-h-[calc(100dvh-75px)] flex flex-col text-gray-900">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-6">
                <h2 className="sm:text-3xl text-xl font-bold bg-[linear-gradient(92.77deg,#080C1D_7.73%,#7E808C_99.72%)] bg-clip-text text-transparent select-none text-center sm:text-start">Service List</h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            name="searchVal"
                            placeholder="Search by Service Name"
                            className="w-full !pl-12 pr-4 py-3 rounded-lg text-lg border border-btnGrFromLight  text-gray-900  focus:ring-btnGrToLight  placeholder-textGrayMedium !mt-0"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-textGrayMedium z-10" size={22} />
                        {search && (
                            <X
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer z-10"
                                size={22}
                                onClick={() => setSearch("")}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-between">
                <span className="text-black-600 ml-auto sm:text-base text-sm">
                    Showing {(currentPage - 1) * PAGE_SIZE + 1} to {Math.min(currentPage * PAGE_SIZE, totalServices)} of {totalServices} services
                </span>
            </div>

            <div className="rounded-lg bg-bgLight shadow-sm border border-btnGrFromLight -mt-2 overflow-x-auto">
                <table className="min-w-[800px] w-full border-collapse text-sm md:text-base">
                    <thead className="block w-full sticky top-0 z-10 bg-btnGrFromLight ">
                        <tr className="flex w-full justify-between">
                            <th className="flex-[0_0_80px] px-3 md:px-6 py-2 text-left font-semibold text-black-600  select-none">Image</th>
                            <th className="flex-[0_0_180px] px-3 md:px-6 py-2 text-left font-semibold text-black-600  select-none">Service Name</th>
                            <th className="flex-[0_0_140px] px-3 md:px-6 py-2 text-left font-semibold text-black-600  select-none">Category</th>
                            <th className="flex-[0_0_100px] px-3 md:px-6 py-2 text-left font-semibold text-black-600  select-none">Price</th>
                            <th className="flex-[0_0_240px] px-3 md:px-6 py-2 text-left font-semibold text-black-600  select-none">Description</th>
                            <th className="flex-[0_0_80px] px-3 md:px-6 py-2 text-left font-semibold text-black-600  select-none">Gender</th>
                            <th className="flex-[0_0_160px] px-3 md:px-6 py-2 text-left font-semibold text-black-600  select-none">Salon Name</th>
                            <th className="flex-[0_0_120px] px-3 md:px-6 py-2 text-left font-semibold text-black-600  select-none">City</th>
                            <th className="flex-[0_0_120px] px-3 md:px-6 py-2 text-left font-semibold text-black-600  select-none">Area</th>
                        </tr>
                    </thead>
                    <tbody className="block w-full h-[244px] overflow-y-scroll scrollbar-thin divide-y divide-btnGrFromLight bg-bgLight  hide-scrollbar">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />)
                        ) : filteredServices.length > 0 ? (
                            filteredServices.map((service, index) => (
                                <tr key={index} className="flex w-full hover:bg-btnGrFromLight  transition-all cursor-pointer group justify-between items-center">
                                    <td className="flex-[0_0_80px] px-3 md:px-6 py-2 truncate">
                                        <img src={service.service_image} alt={service.service_name} className="w-12 h-12 object-cover rounded" />
                                    </td>
                                    <td className="flex-[0_0_180px] px-3 md:px-6 py-2 truncate font-semibold">{service.service_name}</td>
                                    <td className="flex-[0_0_140px] px-3 md:px-6 py-2 truncate">{service.category_name || (service.master_service_data?.category?.name ?? "-")}</td>
                                    <td className="flex-[0_0_100px] px-3 md:px-6 py-2 truncate">₹{service.price}</td>
                                    <td className="flex-[0_0_240px] px-3 md:px-6 py-2 truncate">
                                        <span className="block" dangerouslySetInnerHTML={{ __html: service.description }} />
                                    </td>
                                    <td className="flex-[0_0_80px] px-3 md:px-6 py-2 truncate">{service.gender}</td>
                                    <td className="flex-[0_0_160px] px-3 md:px-6 py-2 truncate">{service.salon_name}</td>
                                    <td className="flex-[0_0_120px] px-3 md:px-6 py-2 truncate">{service.city}</td>
                                    <td className="flex-[0_0_120px] px-3 md:px-6 py-2 truncate">{service.area}</td>
                                </tr>
                            ))
                        ) : (
                            <tr className="flex w-full">
                                <td colSpan={9} className="flex-1 px-3 md:px-6 py-6 text-center text-gray-800 ">
                                    No Data Available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};
