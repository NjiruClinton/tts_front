import client from './graphqlClient'

const CREATE_TASK_MUTATION = `
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      priority
      status
      deadline
    }
  }
`
const UPDATE_TASK_MUTATION = `
  mutation UpdateTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      status
      priority
      description
      updatedAt
    }
  }
`

const DELETE_TASK_MUTATION = `
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`

const FETCH_TASKS_QUERY = `
query MyTasksWithSearch($first: Int!, $search: String, $orderBy: String, $orderDirection: String, $status: String) {
    myTasksPaginated(input: {
      first: $first,
      search: $search,
      status: $status,
      orderBy: $orderBy,
      orderDirection: $orderDirection
    }) {
      edges {
        node {
          id
          title
          priority
          description
          deadline
          status
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`
const GET_TASK_COUNTS_QUERY = `
  query GetMyTaskCounts {
    myTaskStatusCounts {
      todo
      in_progress
      done
      total
    }
  }
`

export const createTask = async (title: string, description: string, priority: string, deadline: string) => {
    const variables = {
        input: { title, description, priority, deadline },
    }
    const token = sessionStorage.getItem('token')
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    const response: any = await client.request(CREATE_TASK_MUTATION, variables, headers)
    return response.createTask
}

export const fetchTasks = async (first: number, search: string, status: string, orderBy: string, orderDirection: string) => {
    const variables = {
        first,
        search,
        status,
        orderBy,
        orderDirection
    }
    const token = sessionStorage.getItem('token')
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    const response: any = await client.request(FETCH_TASKS_QUERY, variables, headers)
    const tasks = response.myTasksPaginated.edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        description: edge.node.description,
        priority: edge.node.priority,
        status: edge.node.status,
        deadline: new Date(parseInt(edge.node.deadline)).toLocaleDateString('en-US'),
        createdAt: new Date(parseInt(edge.node.createdAt) / 1000).toLocaleDateString('en-US')
    }))
    return {
        tasks,
        pageInfo: response.myTasksPaginated.pageInfo,
        totalCount: response.myTasksPaginated.totalCount
    }
}

export const fetchTaskCounts = async () => {
    const token = sessionStorage.getItem('token')
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    const response: any = await client.request(GET_TASK_COUNTS_QUERY, {}, headers)
    return response.myTaskStatusCounts
}

export const updateTask = async (id: string, title: string, description: string, priority: string, status: string, deadline: string = '') => {
    const variables = {
        id,
        input: { title, description, priority, status, deadline },
    }
    const token = sessionStorage.getItem('token')
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    const response: any = await client.request(UPDATE_TASK_MUTATION, variables, headers)
    return response.updateTask
}