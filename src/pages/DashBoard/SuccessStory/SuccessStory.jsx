import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SuccessStory = () => {
    const axiosSecure = useAxiosSecure();
    const [openModal, setOpenModal] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);

    // Get success stories with biodata info
    const { data: stories = [], isLoading } = useQuery({
        queryKey: ["successStories"],
        queryFn: async () => {
            const res = await axiosSecure.get("/successStories/full");
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center">Loading...</p>;

    return (
        <div>
            {
                stories.length > 0 ? <div className="overflow-x-auto">
                    <h2 className="text-xl font-bold mb-4 text-center dark:text-gray-200">Success Stories</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Male Biodata ID</TableHeadCell>
                                <TableHeadCell>Female Biodata ID</TableHeadCell>
                                <TableHeadCell>Actions</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {stories.map((story) => (
                                <TableRow key={story._id} className="dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell>{story.male?.biodataId}</TableCell>
                                    <TableCell>{story.female?.biodataId}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="xs"
                                            onClick={() => {
                                                setSelectedStory(story);
                                                setOpenModal(true);
                                            }}
                                        >
                                            View Story
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Modal */}

                    {selectedStory && (
                        <Modal show={openModal} onClose={() => setOpenModal(false)}>
                            <ModalHeader>Marriage Success Story</ModalHeader>
                            <ModalBody>
                                <div className="text-center">
                                    <img
                                        src={selectedStory?.coupleImage}
                                        alt="Couple"
                                        // className="mx-auto rounded-lg max-w-sm"
                                        className="mx-auto rounded-lg w-10/12"
                                    />
                                    <p className="mt-2 text-gray-600">
                                        Marriage Date:{" "}
                                        {new Date(selectedStory?.marriageDate).toLocaleDateString()}
                                    </p>
                                    <div className="flex justify-center my-2 text-yellow-500">
                                        {[...Array(selectedStory.reviewStar)].map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>
                                    <p className="text-gray-800 text-justify whitespace-pre-line">
                                        {selectedStory?.review}
                                    </p>
                                </div>
                            </ModalBody>
                        </Modal>
                    )}

                </div> : <p className="text-center text-red-500">No success story available</p>
            }
        </div>
    );
};

export default SuccessStory;
