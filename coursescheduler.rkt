;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-intermediate-lambda-reader.ss" "lang")((modname coursescheduler) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))
(require spd/tags)

;; Data Definitions:

(@htdd Course)
(define-struct course (name subject number section days start end))
;; Course is (make-course String String (listof String) Natural Natural)
;; interp. name: the course deparment and number
;;         subject: course subject, i.e: CPSC
;;         number:  course number,  i.e: 121
;;         section: the section that course belongs
;;         days:    the date of course takes place
;;         start:   time the section starts
;;         end:     time the section ends

(define CPSC121-A
  (make-course "CPSC121-A" "CPSC" "121" "A" (list "Mon" "Wed" "Fri") 11 12))
(define CPSC121-B
  (make-course "CPSC121-B" "CPSC" "121" "B" (list "Mon" "Wed" "Fri") 11 12))
(define CPSC121-C
  (make-course "CPSC121-C" "CPSC" "121" "C" (list "Tue" "Thur")      13 14))
(define CPSC110-A
  (make-course "CPSC110-A" "CPSC" "110" "A" (list "Mon" "Wed" "Fri") 13 14))
(define CPSC110-B
  (make-course "CPSC110-B" "CPSC" "110" "B" (list "Mon" "Wed" "Fri") 14 15))
(define CPSC210-A
  (make-course "CPSC210-A" "CPSC" "210" "A" (list "Tue" "Thur")      09 12))
(define CPSC210-B
  (make-course "CPSC210-B" "CPSC" "210" "B" (list "Tue" "Thur")      14 15))


(define COURSES
  (list CPSC121-A
        CPSC121-B
        CPSC121-C
        CPSC110-A
        CPSC110-B
        CPSC210-A
        CPSC210-B))


(@htdd Schedule)
(define-struct schedule (assigned remain))
;; Schedule is (make-schedule (list (listof String)) (listof Course))
;; interp. A node represents assignments and slots at each level of tree,
;;         assigned: list of courses can be registered
;;         remain:   remaining courses to be assigned

(define (fn-for-schedule s)
  (... (schedule-assigned s)
       (schedule-remain s)))

;; Function Definitions:
(@htdf solve)
(@signature (listof Course) -> (listof String))
;; produce list of names of courses that can be taken by a student
(check-expect (solve COURSES) empty)
(check-expect (solve (list CPSC121-A CPSC121-B CPSC110-A CPSC210-A))
              (list (list "CPSC121-A" "CPSC110-A" "CPSC210-A")
                    (list "CPSC121-B" "CPSC110-A" "CPSC210-A")))

;(define (solve loc) empty);stub

(@template genrec arb-tree accumulator)

(define (solve loc0)
  (local [(define (fn-for-schedule s s-wl rsf)
            (cond [(finished? s)
                   (if (complete? (schedule-assigned s) loc0)
                       (fn-for-los s-wl (cons s rsf))
                       (fn-for-los s-wl rsf))]
                  [else
                   (fn-for-los (append (next s) s-wl) rsf)]))

          (define (fn-for-los s-wl rsf)
            (cond [(empty? s-wl) (get-courses rsf)]
                  [else
                   (fn-for-schedule (first s-wl) (rest s-wl) rsf)]))

          (define (finished? s)
            (empty? (schedule-remain s)))
          
          (define (next s)
            (filter good-schedule? (list (pick s) (skip s))))
          
          (define (pick s)
            (local [(define c (first (schedule-remain s)))]
              (make-schedule (cons c (schedule-assigned s))
                             (rest (schedule-remain s)))))
          
          (define (skip s)
            (make-schedule (schedule-assigned s)
                           (rest (schedule-remain s))))
          
          (define (good-schedule? s)
            (not (already-contains? (schedule-assigned s))))
          ;(not (overlap? s))

          (define (get-courses los)
            (map (λ (loc) (map course-name loc))
                 (map (λ (s) (schedule-assigned s)) los)))]
    
    (fn-for-schedule (make-schedule empty loc0) empty empty)))

;; (map (λ (loc) (map course-name loc))

(@htdf already-contains?)
;; produce true if given assigned courses do not have duplicate course
(@signature (listof Course) -> Boolean)
(check-expect (already-contains? empty) true)
(check-expect (already-contains? (list CPSC121-A)) false)
(check-expect (already-contains? (list CPSC121-A CPSC121-B)) true)
(check-expect (already-contains? (list CPSC121-A CPSC110-B CPSC210-A)) false)
(check-expect (already-contains? (list CPSC121-A CPSC110-B CPSC210-A CPSC210-B))
              true)

(define (already-contains? loc0)
  (local [(define (already-contains? loc)
            (cond [(empty? loc) false]
                  [else
                   (if (ormap (λ (c) (match-course? c (first loc))) (rest loc))
                       true
                       (already-contains? (rest loc)))]))]
    (if (empty? loc0)
        true
        (already-contains? loc0))))



(@htdf complete?)
(@signature (listof Course) (listof Course) -> Boolean)
;; produce true if assigned contains all neccessary courses in og-loc
;; CONSTRAINT: og-loc cannot be empty
(check-expect (complete? empty COURSES) false)
(check-expect (complete? (list CPSC121-A) COURSES) false)
(check-expect (complete? (list CPSC121-A CPSC110-A) COURSES) false)
(check-expect (complete? (list CPSC121-A CPSC110-A CPSC210-A) COURSES) true)

(define (complete? assigned og-loc)
  (local [(define (included? c)
            (not (ormap (λ (a) (match-course? a c)) assigned)))]
    (empty? (filter included? og-loc))))



(@htdf match-course?)
(@signature Course Course -> Boolean)
;; produce true if c1 and c2 have same course subject + number
(check-expect (match-course? CPSC121-A CPSC121-B) true)
(check-expect (match-course? CPSC121-A CPSC110-A) false)

(define (match-course? c1 c2)
  (and (string=? (course-subject c1) (course-subject c2))
       (string=? (course-number c1) (course-number c2))))