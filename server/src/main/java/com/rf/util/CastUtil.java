package com.rf.util;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class CastUtil {

	private static String FORMAT_DATE = "HH:mm:ss dd/MM/yyyy";

	public static Long toLong(String value) {
		return Long.valueOf(value);
	}
	
	public static Long toLong(String value, Long returnIfFail) {
		try {
			return toLong(value);
		} catch (Exception e) {
			if (returnIfFail != null) {
				return returnIfFail;
			} else {
				return null;
			}
		}
	}

	public static Long toLong(Object value) {
		try {
			return Double.valueOf(value.toString()).longValue();
		} catch (Exception e) {
			return null;
		}
	}

	public static Double toDouble(Object value) {
		try {
			return Double.valueOf(value.toString());
		} catch (Exception e) {
			return null;
		}
	}

	public static Integer toInteger(Object value) {
		try {
			return Double.valueOf(value.toString()).intValue();
		} catch (Exception e) {
			return 0;
		}
	}

	public static int toInt(String value) {
		return Double.valueOf(value).intValue();
	}
	
	public static int toInt(String value, int returnIfFail) {
		try {
			return toInt(value);
		} catch (Exception e) {
			return returnIfFail;
		}
	}

	public static String toString(Object obj) {
		try {
			return obj.toString();
		} catch (Exception e) {
			return null;
		}
	}

	public static Date toDate(Object data, String FORMATO) {
		if (FORMATO == null) {
			FORMATO = FORMAT_DATE;
		}
		if (data == null)
			return null;

		Date date = null;
		try {
			DateFormat formatter = new SimpleDateFormat(FORMATO);
			date = (java.util.Date) formatter.parse(toString(data));
		} catch (ParseException e) {

			return null;
		}
		return date;
	}

	public static Date toDate(Object data) {
		if (data instanceof Calendar) {
			return ((Calendar) data).getTime();
		} else if (data instanceof Date) {
			return (Date) data;
		} else {
			return toDate(data, FORMAT_DATE);
		}
	}

	public static byte[] toByteArray(Object data) {
		try {
			return (byte[]) data;
		} catch (Exception e) {
			return null;
		}
	}

	public static boolean toBoolean(String value) {
		try {
			return Boolean.valueOf(value);
		} catch (Exception e) {
			return false;
		}
	}

	public static Boolean toBoolean(Object obj) {
		if (obj instanceof Boolean) {
			return (Boolean) obj;
		} else {
			return null;
		}
	}

	public static String dateAndTimeToString(Date date) {
		DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		return formatter.format(date);
	}

	public static String dateToString(Date date) {
		DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		return formatter.format(date);
	}

}