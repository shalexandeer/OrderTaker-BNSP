import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/custom/button";
import { useGetUserDropdownInfo } from "@/services/Users/Users.query";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { CommandLoading } from "cmdk";

interface SelectUserPopUpProps {
  selectedUser?: { username: string }; // Optional selected user prop
  setSelectedUser: (user: { id: string; username: string }) => void; // New prop to pass selected user back to the form
}

export function SelectUserPopUp({ setSelectedUser, selectedUser }: SelectUserPopUpProps) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(""); // Selected user state
  const [query, setQuery] = useState(""); // Local search query state
  const debouncedQuery = useDebounce(query, 500); // Debounced query with 500ms delay
  const { data: users, isLoading } = useGetUserDropdownInfo(debouncedQuery); // Fetch users based on debounced query

  useEffect(() => {
    if (selectedUser?.username !== '') {
      setUser(selectedUser?.username ?? ""); // Set selected user in local state with default value
    }
  }, [selectedUser, user])
  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <p className="text-sm font-semibold">Pilih User</p>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between" disabled={selectedUser?.username !== ''}>
          {user ? user : "Pilih User..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            value={query}
            onValueChange={setQuery} // Update query on user input
            placeholder="Cari user..." // "Search for user..." in Indonesian
          />
          <CommandList>
            {isLoading && <CommandLoading><p className="p-2">Loading...</p></CommandLoading>} {/* Show loading state */}
            <CommandEmpty>{users ? 'User tidak ditemukan.': null}</CommandEmpty> {/* If no users found */}
            <CommandGroup>
              {users?.data.map((user) => (
                <CommandItem
                  className="cursor-pointer"
                  key={user.id}
                  value={user.username}
                  onSelect={() => {
                    setUser(user.username); // Set selected username in local state
                    setQuery(""); // Clear search query
                    setOpen(false); // Close dropdown
                    setSelectedUser({ id: user.id, username: user.username }); // Pass selected user data back to the parent
                  }}
                >
                  {user.username}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
