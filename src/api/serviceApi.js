import { API_URL } from './http'

// const allUsers = () => `${API_URL}/user`;

const allBranches = () => `${API_URL}/branch`;

const allDepartments = () => `${API_URL}/department`;

const allDesignations = () => `${API_URL}/designation`;

const allReporters = () => `${API_URL}/reporter`;

const allShifts = () => `${API_URL}/shift`;

const createEmployee = () => `${API_URL}/employee`;

const allEmployees = () => `${API_URL}/employee`;

const getEmployees = (id) => `${API_URL}/employee/${id}`;

export default { allBranches, allDepartments, allDesignations, allReporters, allShifts, createEmployee, allEmployees, getEmployees };