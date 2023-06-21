namespace js Pjatk

enum Operation {
  ADD
  SUBTRACT
  MULTIPLY
  DIVIDE
}

struct Calculation {
  1: i32 a
  2: i32 b
  3: Operation operation
}

exception InvalidOperation {
  1: i32 operation,
  2: string reason
}

service Calculator {
  i32 calculate(1:Calculation calculation) throws (1:InvalidOperation operation)
}