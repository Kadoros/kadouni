"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Shadcn UI의 Button과 Input 컴포넌트
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FaTrash, FaCheck } from "react-icons/fa"; // 아이콘 추가
import { nanoid } from "nanoid"; // 고유한 ID 생성을 위한 nanoid
import { ScrollArea } from "@/components/ui/scroll-area";

interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newItem: TodoItem = {
        id: nanoid(),
        title: newTodo,
        completed: false,
      };
      setTodos([...todos, newItem]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Card className="container mx-auto p-4 max-w-xs h-1/3">
      <h1 className="text-lg font-bold mb-2">To-Do Today</h1>

      <div className="mb-2 flex justify-between"> {/* Flexbox를 사용하여 정렬 */}
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New task..."
          className="w-full border rounded h-8"
        />
        <Button onClick={addTodo} className="ml-2" size={"sm"}> {/* 버튼 간격을 위해 ml-2 추가 */}
          Add 
        </Button>
      </div>

      <ScrollArea className=" h-52">
        {todos.map((todo) => (
          <Card key={todo.id} className="p-0 bg-white shadow-md rounded-lg px-3 mb-1">
            <div className="flex justify-between items-center">
              <div
                className={`flex items-center ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-2"
                />
                {todo.title}
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" onClick={() => toggleTodo(todo.id)}>
                  <FaCheck />
                </Button>
                <Button variant="ghost" onClick={() => deleteTodo(todo.id)}>
                  <FaTrash />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </ScrollArea >
    </Card>
  );
};

export default TodoList;
