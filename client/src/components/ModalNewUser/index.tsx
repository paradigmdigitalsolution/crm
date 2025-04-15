"use client";

import Modal from "@/components/Modal";
import { useCreateUserMutation } from "@/state/api";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewUser = ({ isOpen, onClose }: Props) => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [teamName, setTeamName] = useState("");
  const [role, setRole] = useState("User");

  const isFormValid = () =>
    username && password && profilePictureUrl && teamName && role;

  const handleSubmit = async () => {
    try {
      await createUser({
        username,
        password,
        profilePictureUrl,
        teamName,
        role,
      }).unwrap();
      onClose(); // close modal on success
    } catch (error: any) {
      alert(error?.data?.message || "Failed to create user");
    }
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-[#3b3d40] dark:bg-[#3b3d40] dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New User">
      <form
        className="mt-4 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          placeholder="Username"
          className={inputStyles}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={inputStyles}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profile Picture URL"
          className={inputStyles}
          value={profilePictureUrl}
          onChange={(e) => setProfilePictureUrl(e.target.value)}
        />
        <select
          className={inputStyles}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        >
          <option value="CEOs">CEO`s</option>
          <option value="Sales">Sales</option>
          <option value="Project Manager">ProjectManager</option>
          <option value="Production">Production</option>
          <option value="Client">Client</option>
          <option value="QA">QA</option>
        </select>
        <select
          className={inputStyles}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Admin">Admin</option>
          <option value="Sales">Sales</option>
          <option value="ProjectManager">Project Manager</option>
          <option value="Production">Production</option>
          <option value="Client">Client</option>
          <option value="QA">QA</option>
        </select>

        <button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? "Creating..." : "Create User"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewUser;
