//**************************************************
//Booking.java
//3/23/23
//A Java class that represents passenger booking; part 2 of 2
//**************************************************

import java.util.Date;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Random;

public class Booking {
    //Private Data Fields:
    private AirlinePassenger passenger = new AirlinePassenger();
    private String flightNumber;
    private String seatNumber;
    private LocalDateTime bookingDateTime = LocalDateTime.now();
    private LocalTime bookingTime = LocalTime.now();
    private String bookingNumber;

    //Constructors
    public Booking() {
    }

    public Booking(AirlinePassenger passenger, String flightNumber, String seatNumber,
            LocalDateTime bookingDateTime, String bookingNumber) {
        this.passenger = passenger;
        this.flightNumber = flightNumber;
        this.seatNumber = seatNumber;
        this.bookingDateTime = bookingDateTime;
        this.bookingNumber = bookingNumber;
    }

    //Getters and Setters
    public AirlinePassenger getPassenger() {
        return passenger;
    }

    public void setPassenger(AirlinePassenger passenger) {
        this.passenger = passenger;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public LocalDateTime getBookingDateTime() {
        return bookingDateTime;
    }

    public void setBookingDateTime(LocalDateTime bookingDateTime) {
        this.bookingDateTime = bookingDateTime;
    }

    public LocalTime getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(LocalTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    public String getBookingNumber() {
        return bookingNumber;
    }

    public void setBookingNumber(String bookingNumber) {
        this.bookingNumber = bookingNumber;
    }
    //End of Getters and Setters
    
    //toString()
    public String toString() {
        return "\nFlight Information: " + 
        "\nFlight Number: " + flightNumber +
        "\nSeat Number: " + seatNumber + 
        "\nBooking Date Time: " + bookingDateTime +
        "\nBooking Number: " + bookingNumber;
    }
    
}