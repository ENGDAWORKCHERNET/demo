name = input (' type your name: ')
print('welcom', name, "Once upon a time, there were three friends michael, kaleab, and ebenezer who were attending the same school. They loved nothing more than smoking cannabis and hanging out together, but there was one problem: their parents didn't approve of their habit. Since they all still lived with their parents, they had to be extra careful not to get caught.")

answer = input('kaleab call you, what do you do /answer/dont answer: ').lower()

if answer == 'answer':
    answer = input("yooooo miki you trina pull up today bro /no/yessir/nahh pull up to my carb!")
    
    if answer == 'yessir':
        answer = input('you drive to kleabs crib and start blazing you finish your first J and kaleab asks you if you want to roal another one /yes/no: ')
        
        if answer =='yes':
            answer = input('you guys get to rolling a thick ass joint and out of nowhere you hear the door knock what do you do /flush the j and open/open: ')
            if answer =='open':
                print('you open the door and its the maid and she brought some food yaaaaaaaaa :) ')
            elif answer == 'flush the j and open':
                print('it was the made and now you dont have a j :()') 
            else:
                print('not a valid answre')     
        
    if answer == 'nahh pull up to my crib':    
        answer = input('kali comes to your crib and yall start smoking and then kali says lets call ebay /call/nahh he not pulling up bro: ')
        
        if answer == 'call':
            print('ebenezer answers the phone and yall talk to him and he tells you he go work to do :(')
        elif answer == 'nahh he not pullingup bro':
            print('kaleab ends up calling and ebenezer tells him he cant show up today :( ')   
        
    else:
        print('meow meow meowwwwwww :)')    
elif answer == 'dont answer':
    quit()
else:
    print('not a valid option. you lose.')   
         
answer = input('after a long day of chillin kali out of nowhere says lets go out and get some drinks and party what do you say /nahhh bro / ight bet / ')
    
if answer == 'ight bet':
    answer = input('you and kali go out ebe pulls up out of nowhere and you are having a good time. a nigga pulls up and tells you they bout to spark up what u do / go / stay / ')
    
    if answer == 'go':
        print('you guys go out and light up the joint then a cop comes out from the shadows and kills all of yall :(')
        quit
    elif answer == 'stay':
        answer = input('you coolin the hozzz pull up and you have an amazing time :)')
        
answer = input('the ozzz pull up with hella drinks and now you getting pressed by some bitches what you do /nahhh i dont drink/drink/  ').lower()

if answer == 'drink':
    answer = input("they start puring you shots and shots you start drinking like a mf then it got late af and you are tired what do you do /go home with ebe/drive back/: ")
    
    if answer == 'drive back':
        print('you are driving back home and a cop stops you and kills you :( ')
             
    elif answer == 'go home with ebe':
        print('ebenezer takes you to the crib safe and you have the best sleep ever 🥳🥳')
              
              
              
elif answer == 'nahh i dont drink':
    print('you have a good time with your niggas and you go to the crif and chill 🥳')  
    
