import { Button, Checkbox, Col, DatePicker, Input, List, Row, Space, Typography } from 'antd';
import { request } from './utils/request';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface TaskInterface {
  title: string;
  due_date: string;
}

interface DataInterface {
  id: number;
  title: string;
  due_date: string;
  checked: boolean;
}

const App = (): JSX.Element => {
  const [data, setData] = useState<Array<DataInterface>>([])
  const [task, setTask] = useState<TaskInterface>({
    title: "",
    due_date: new Date().toISOString()
  });
  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      ...task,
      title: e.target.value
    })
  }
  const updateDate = (e: moment.Moment | null) => {
    console.log(e)
    setTask({
      ...task,
      due_date: e?.toDate().toISOString() || task.due_date
    })
  }
  const handleSubmit = async () => {
    try {
      const newTask = await request.post("/tasks", task);
      setData([...data, newTask.data])
    } catch (err) {
      alert("yout not admin or the request is forbidden")
    }
    setTask({
      title: '',
      due_date: new Date().toISOString()
    })
  }

  const handleCheckbox = (event: CheckboxChangeEvent) => {
    const { name } = event.target;
    const newArr = data.map(e => {
      if(name === `${e.id}-${e.title}`) {
        e.checked = !e.checked
      }
      return e;
    });
    setData([...newArr])
  }

  const handleCheckSubmit = () => {

  }

  useEffect(() => {
    (async () => {
      try {
        const todoList = await request.get("/tasks")
        setData(todoList.data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [])

  return (
    <>
      <Row justify="center" style={{padding: "20px 0"}}>
        <Col style={{margin: "0 10px"}}>
          <Input 
            size="large"
            value={task.title}
            placeholder="Task title"
            onChange={updateTitle}
          />
        </Col>
        <Col style={{margin: "0 10px"}}>
          <DatePicker
            showTime
            showMinute
            placeholder="Due date"
            size="large"
            value={moment(task.due_date)}
            onChange={updateDate}
          />
        </Col>
        <Col style={{margin: "0 10px"}}>
          <Button type="primary" size="large" onClick={handleSubmit}>Add</Button>
        </Col>
      </Row>
      <div style={{
        marginTop: '10%',
        marginLeft: '10%',
        marginRight: '10%',
      }}>
        <List
          header="List"
          bordered
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Space>
                <Checkbox onChange={handleCheckbox} checked={item.checked} name={`${item.id}-${item.title}`} />
                <Typography.Text>{item.checked ? <del>{item.title}</del> : item.title}</Typography.Text>
              </Space>
              <Typography.Text>{moment(item.due_date).format('MMMM Do YYYY, h:mm:ss a')}</Typography.Text>
            </List.Item>
          )}
        />
        <Button
          type="primary" 
          size="large" 
          onClick={handleCheckSubmit} 
          style={{
            float: 'right',
            marginTop: 10
          }}
        >Submit</Button>
      </div>
    </>
  );
}

export default App;
