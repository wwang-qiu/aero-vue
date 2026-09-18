import aircraft
import user
while True:
    try:
        choice = int(input("请输入选择："))
    except ValueError:
        print("choice只能为数字，请重新输入")
        continue
    if choice == 1:
        aircraft.add_aircraft()
    elif choice == 2:
        aircraft.show_aircraft()
    elif choice == 3:
        user.add_user()
    elif choice == 4:
        user.show_user()
    else:
        break
