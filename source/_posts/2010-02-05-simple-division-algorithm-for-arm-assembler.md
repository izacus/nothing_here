---
title: Simple division algorithm for ARM assembler
author: Jernej Virag
layout: post
permalink: /2010/02/simple-division-algorithm-for-arm-assembler/
categories:
  - Computer stuff
  - Helpful tips
tags:
  - arm
  - asm
  
---
As I'm currently working on a compiler from a madeup language for compiler lectures, I had to find a rather decently fast division algorithm for ARM9, which is my target platform, since DIV command was introduced not sooner than ARM11 architecture.

So I found a simple divison algorithm, that speeds up basic "school child" subtractive division with shifting:

``` asm

 CMP             R2, #0
 BEQ divide_end
 ;check for divide by zero!

 MOV      R0,#0     ;clear R0 to accumulate result
 MOV      R3,#1     ;set bit 0 in R3, which will be
                    ;shifted left then right
.start
 CMP      R2,R1
 MOVLS    R2,R2,LSL#1
 MOVLS    R3,R3,LSL#1
 BLS      start
 ;shift R2 left until it is about to
 ;be bigger than R1
 ;shift R3 left in parallel in order
 ;to flag how far we have to go

.next
 CMP       R1,R2      ;carry set if R1&gt;R2 (don't ask why)
 SUBCS     R1,R1,R2   ;subtract R2 from R1 if this would
                      ;give a positive answer
 ADDCS     R0,R0,R3   ;and add the current bit in R3 to
                      ;the accumulating answer in R0

 MOVS      R3,R3,LSR#1     ;Shift R3 right into carry flag
 MOVCC     R2,R2,LSR#1     ;and if bit 0 of R3 was zero, also
                           ;shift R2 right
 BCC       next            ;If carry not clear, R3 has shifted
                           ;back to where it started, and we
                           ;can end

.divide_end
 MOV       R25, R24        ;exit routine
 
```

More in-depth description of the algorithm workings is available on the [source site][1].

 [1]: http://www.tofla.iconbar.com/tofla/arm/arm02/index.htm