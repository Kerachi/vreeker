import { RequestHandler } from "express";

const CLOCKIN_API_KEY = process.env.CLOCKIN_API_KEY;
const CLOCKIN_BASE_URL = "https://api.clockin.com/v1";

interface Employee {
  id: string;
  name: string;
  status: "clocked_in" | "clocked_out";
  todayHours: number;
  weekHours: number;
  projects?: string[];
}

export const handleGetClockInHours: RequestHandler = async (req, res) => {
  try {
    if (!CLOCKIN_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Clockin API key not configured",
      });
    }

    const response = await fetch(`${CLOCKIN_BASE_URL}/hours`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CLOCKIN_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Clockin API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Transform the data into the format our frontend expects
    const employees: Employee[] =
      data.employees?.map((emp: any) => ({
        id: emp.id,
        name: emp.name,
        status: emp.clocked_in ? "clocked_in" : "clocked_out",
        todayHours: emp.hours_today || 0,
        weekHours: emp.hours_this_week || 0,
        projects: emp.projects || [],
      })) || [];

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    console.error("Error fetching Clockin data:", error);
    res.status(500).json({
      success: false,
      message: "Clockin API kon niet geladen worden.",
    });
  }
};

export const handleGetClockInEmployeeDetail: RequestHandler = async (
  req,
  res,
) => {
  try {
    const { employeeId } = req.params;

    if (!CLOCKIN_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Clockin API key not configured",
      });
    }

    const response = await fetch(`${CLOCKIN_BASE_URL}/hours/${employeeId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CLOCKIN_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Clockin API error: ${response.statusText}`);
    }

    const data = await response.json();

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Error fetching Clockin employee detail:", error);
    res.status(500).json({
      success: false,
      message: "Employee details kon niet geladen worden.",
    });
  }
};
