import { useState } from "react";
import { UserPlus, Search, Pencil, Trash2 } from "lucide-react";
import { useFetch } from "../../hooks/useFetch";
import { userService } from "../../api/services/user.service"; //need to define the user services
import type { User } from "../../types/user.types";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import UserForm from "../../components/features/users/UserForm/UserForm";
import type { UserFormData } from "../../components/features/users/UserForm/UserForm.types";
import { formatDate } from "../../utils/formatters";
import { useDebounce } from "../../hooks/useDebounce";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const {
    data: users,
    loading,
    refetch,
  } = useFetch(() => userService.getUsers(), []);

  const filteredUsers =
    users?.filter(
      (user: User) =>
        user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    ) || [];

  const handleCreateUser = async (data: UserFormData) => {
    setIsSubmitting(true);
    try {
      await userService.createUser({
        ...data,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(
          Math.random() * 70
        )}`,
        createdAt: new Date().toISOString(),
      } as User);
      (await refetch()) as Promise<void>;
      setIsModalOpen(false);
      setSelectedUser(undefined);
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (data: UserFormData) => {
    if (!selectedUser) return;

    setIsSubmitting(true);
    try {
      await userService.updateUser(selectedUser.id.toString(), data as User);
      (await refetch()) as Promise<void>;
      setIsModalOpen(false);
      setSelectedUser(undefined);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    setIsSubmitting(true);
    try {
      await userService.deleteUser(userToDelete.id.toString());
      (await refetch()) as Promise<void>;
      setIsDeleteModalOpen(false);
      setUserToDelete(undefined);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const columns = [
    {
      key: "avatar",
      header: "Avatar",
      render: (user: User) => (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />
      ),
    },
    {
      key: "name",
      header: "Name",
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (user: User) => (
        <Badge variant={user.role === "Admin" ? "info" : "default"}>
          {user.role}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (user: User) => (
        <Badge variant={user.status === "active" ? "success" : "danger"}>
          {user.status}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      render: (user: User) =>
        user.createdAt ? formatDate(user.createdAt) : "-",
    },
    {
      key: "actions",
      header: "Actions",
      render: (user: User) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openEditModal(user);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit user"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openDeleteModal(user);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete user"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">
            Manage your users and their permissions.
          </p>
        </div>
        <Button
          leftIcon={<UserPlus size={18} />}
          onClick={() => {
            setSelectedUser(undefined);
            setIsModalOpen(true);
          }}
        >
          Add User
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              leftIcon={<Search size={18} />}
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
            />
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card padding="none">
        <Table data={filteredUsers} columns={columns} loading={loading} />
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(undefined);
        }}
        title={selectedUser ? "Edit User" : "Create New User"}
      >
        <UserForm
          user={selectedUser}
          onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedUser(undefined);
          }}
          loading={isSubmitting}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setUserToDelete(undefined);
        }}
        title="Delete User"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete{" "}
            <strong>{userToDelete?.name}</strong>? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="danger"
              onClick={handleDeleteUser}
              isLoading={isSubmitting}
              fullWidth
            >
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setUserToDelete(undefined);
              }}
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
