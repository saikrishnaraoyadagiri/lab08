import  { useState } from 'react';

const ToDoList = () => {
    const [task, setTask] = useState([])
    const [newTask, setNewTask] = useState('')
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [error, setError] = useState(''); // State to manage error messages



    const handleChange = (e) => {
        setNewTask(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newTask.trim() !== '') {
            setTask([...task, { text: newTask, completed: false }])
            setNewTask('')
            setError('')
        }
        else{
            setError('Please Enter the task')
        }
    }

    const taskCompletion = (index) => {
        const updatedTask = task.map((task1, i) =>
            i === index ? { ...task1, completed: !task1.completed } : task1
        );
        setTask(updatedTask)
    }

    const handleDelete = (index) => {
        const updatedTask = [];
        for (let i = 0; i < task.length; i++) {
            if (i !== index) {
                updatedTask.push(task[i]);
            }
        }
        setTask(updatedTask);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditingText(task[index].text);
    };

    const handleSaveEdit = (index) => {
        const updatedTasks = task.map((task1, i) =>
            i === index ? { ...task1, text: editingText } : task1
        );
        setTask(updatedTasks);
        setEditingIndex(null);
    };

    return (
        <div>
            <h1 style={{marginTop:'20px',paddingLeft:'20px'}}>To Do List</h1><br/>
            <form onSubmit={handleSubmit}>
                <input type="text" value={newTask} onChange={handleChange} placeholder='Enter Your New Task Here' style={{width:'320px',marginRight:'10px',marginLeft:'20px'}} />
                <button type='submit'>Add Task</button><br/>
                {error && <p style={{ color: 'red',marginLeft:'20px' }}>{error}</p>} 

            </form>
            <ul>
                {task.map((task1, index) => (
                    <li key={index} >
                        {editingIndex === index ? (
                            <div>
                                <input type="text" style={{width: '300px', marginRight: '10px',marginTop:'20px'}} value={editingText} onChange={(e) => setEditingText(e.target.value)}/>
                                <button onClick={() => handleSaveEdit(index)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <span onClick={() => taskCompletion(index)} style={{display: 'inline-block',wordWrap:'break-word',width: '300px', marginRight: '10px',marginTop:'20px',textDecoration: task1.completed ? 'line-through' : 'none' }}>{task1.text}</span>
                                <button type="submit" onClick={() => handleEdit(index)} style={{ marginRight: '10px' }}>Edit</button>
                                <button type="submit" onClick={() => handleDelete(index)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList