class KontoBankowe(private var _stanKonta: Double) {
  def this() {
    this(0.0)
  }

  def stanKonta: Double = _stanKonta

  def wplata(kwota: Double): Unit = {
    _stanKonta += kwota
  }

  def wyplata(kwota: Double): Unit = {
    if (kwota <= _stanKonta) {
      _stanKonta -= kwota
    } else {
      throw new IllegalArgumentException("Brak wystarczających środków na koncie")
    }
  }
}

case class Osoba(val imie: String, val nazwisko: String)


object WeekDays {
  val weekDays = List("poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela")

  def task1(): Unit = {
    // a) for loop
    for (day <- weekDays) {
      println(day)
    }

    // b) for loop - but only print days starting with P
    for (day <- weekDays if day.startsWith("p") || day.startsWith("P")) {
      println(day)
    }

    // c) foreach
    weekDays.foreach(day => println(day))

    // d) while
    var i = 0
    while (i < weekDays.length) {
      println(weekDays(i))
      i += 1
    }

    // e) recursive function
    def printWeekDaysRecursive(days: List[String]): Unit = {
      days match {
        case Nil => ()
        case head :: tail =>
          println(head)
          printWeekDaysRecursive(tail)
      }
    }
    printWeekDaysRecursive(weekDays)

    // f) recursive function starting from end
    def printWeekDaysRecursiveReverse(days: List[String]): Unit = {
      days match {
        case Nil => ()
        case head :: tail =>
          printWeekDaysRecursiveReverse(tail)
          println(head)
      }
    }
    printWeekDaysRecursiveReverse(weekDays)

    // g) foldl and foldr
    val foldlResult = weekDays.foldLeft("")((acc, day) => acc + day + "\n")
    println(foldlResult)

    val foldrResult = weekDays.foldRight("")((day, acc) => day + "\n" + acc)
    println(foldrResult)

    // h) foldl but print only starting with P
    val foldlPResult = weekDays.foldLeft("")((acc, day) => if (day.startsWith("p") || day.startsWith("P")) acc + day + "\n" else acc)
    println(foldlPResult)
  }

  def task2(): Unit = {
    val products = Map(
      "Product 1" -> 100.0,
      "Product 2" -> 200.0,
      "Product 3" -> 300.0,
      "Product 4" -> 400.0,
      "Product 5" -> 500.0,
      "Product 6" -> 600.0,
      "Product 7" -> 700.0,
      "Product 8" -> 800.0,
      "Product 9" -> 900.0,
      "Product 10" -> 1000.0
    )

    val discountedProducts = products.mapValues(_ * 0.9).toMap

    println(products)
    println(discountedProducts)
  }

  def task3(tuple: (Int, String, Boolean)): Unit = {
    println(tuple._1)
    println(tuple._2)
    println(tuple._3)
  }

  def task4(): Unit = {
    val map = Map("key1" -> "value1", "key2" -> "value2", "key3" -> "value3")

    val value1 = map.get("key1")
    val value4 = map.get("key4")

    println(value1) // Some("value1")
    println(value4) // None
  }

  def task5(day: String): String = day match {
    case "poniedziałek" | "wtorek" | "środa" | "czwartek" | "piątek" => "Praca"
    case "sobota" | "niedziela" => "Weekend"
    case _ => "Nie ma takiego dnia"
  }

  def task6(): Unit = {
    val konto = new KontoBankowe(1000.0)

    println(s"Stan konta: ${konto.stanKonta}")

    konto.wplata(500.0)
    println(s"Stan konta po wpłacie: ${konto.stanKonta}")

    konto.wyplata(200.0)
    println(s"Stan konta po wypłacie: ${konto.stanKonta}")

    try {
      konto.wyplata(2000.0)
    } catch {
      case e: IllegalArgumentException => println(e.getMessage)
    }
  }

  def task7(): Unit = {
    def przywitaj(osoba: Osoba): String = osoba match {
      case Osoba("Jan", _) => s"Witaj, Janie!"
      case Osoba("Anna", _) => s"Witaj, Anno!"
      case Osoba(_, "Kowalska") => s"Witaj, Pani Kowalska!"
      case Osoba(_, "Nowak") => s"Witaj, Panie Nowak!"
      case Osoba(imie, nazwisko) => s"Witaj, $imie $nazwisko!"
    }

    val osoba1 = new Osoba("Jan", "Kowalski")
    val osoba2 = new Osoba("Anna", "Nowak")
    val osoba3 = new Osoba("Adam", "Nowakowski")

    println(przywitaj(osoba1)) // Witaj, Janie!
    println(przywitaj(osoba2)) // Witaj, Anno!
    println(przywitaj(osoba3)) // Witaj, Adam Nowakowski!
  }

  def task8(lista: List[Int]): List[Int] = lista.filter(_ != 0)

  def main(args: Array[String]): Unit = {
    task1()

    task2()

    task3((42, "Hello, world!", true))

    task4()

    println(task5("poniedziałek"))
    println(task5("sobota"))

    task6()

    task7()

    val lista = List(1, 0, 2, 0, 3, 0, 4)
    val nowaLista = task8(lista)
    println(nowaLista) // List(1, 2, 3, 4)
  }
}