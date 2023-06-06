"use client";

import Image from "next/image";
import  "../styles/home.module.css";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState([]);

  const handleAddTodo = () => {
    const value = document.getElementById("todo-input").value;

    if(value!=""){
      const currentDate = new Date().toLocaleDateString();
      setTodo([...todo, { id: todo.length + 1, text: value, completed: false,createdOn:currentDate }]);
    document.getElementById("todo-input").value = ""
    }
    
  };

  const handleTodoCheck = (index) => {
    console.log(index);
    const newTodo = todo.map((item, i) => {
      if (i + 1 === index) {
        console.log();
        return { id: item.id, text: item.text, completed: !item.completed,createdOn:item.createdOn };
      } else {
        // The rest haven't changed
        return item;
      }
    });

    setTodo(newTodo);
    console.log(todo);
  };
  return (
    <>
      <div className="d-flex justify-content-center mt-4">
        <h1>TodoMe</h1>
      </div>

      <Container className="mt-3">
        <div className="d-flex justify-space-between mb-4">
          <Form.Control
            type="text"
            placeholder="Enter Todo here"
            className="me-5"
            id="todo-input"
          />
          <Button onClick={(e) => handleAddTodo()}>Add</Button>
        </div>

        {todo != []
          ? todo.map((item, index) => (
              <Stack gap={4} direction="horizontal">
                {item.completed ? (
                  <div className="d-flex justify-content-between todo-item mb-2 align-items-center" key={item.text+`-`+index}>
                    <div className="d-flex flex-column">
                    <strike><b>{item.text}</b></strike>
                    <span style={{fontSize:"11px"}}>{item.createdOn}</span>
                    </div>
                    <Form.Check
                    className="ms-3"
                      type="checkbox"
                      id={`default-${index}`}
                      checked={item.completed}
                      onChange={(e) => handleTodoCheck(item.id)}
                    />
                  </div>
                ) : (
                  <div className="d-flex justify-content-between todo-item mb-2 align-items-center" key={item.text+`-`+index}>
                    <div className="d-flex flex-column">
                    <span><b>{item.text}</b></span>
                    <span style={{fontSize:"11px"}}>{item.createdOn}</span>
                    </div>
                    <Form.Check
                     className="ms-3"
                      type="checkbox"
                      id={`default-${index}`}
                      checked={item.completed}
                      onChange={(e) => handleTodoCheck(item.id)}
                    />
                  </div>
                )}
              </Stack>
            ))
          : ""}
      </Container>
    </>
  );
}
