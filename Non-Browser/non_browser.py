import requests

def make_request(url, payload):
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        return {'ok': False, 'message': 'Erro na requisição', 'code': response.status_code}

def menu():
    base_url = 'https://terciodelivery.robertogram.com.br/api/'

    print("Escolha a operação que deseja realizar:")
    print("1 - Depositar Money")
    print("2 - Obter Lanches")
    print("3 - Deletar Lanche")

    choice = input("Digite o número da operação desejada: ")

    if choice == "1":
        valor = float(input("Digite o valor a ser depositado: "))
        data = {'debug': False, 'valor': valor}
        url = base_url + 'DepositarMoney'
        response = make_request(url, data)
    elif choice == "2":
        data = {'debug': False}
        url = base_url + 'GetLanches'
        response = make_request(url, data)
    elif choice == "3":
        lanche_id = int(input("Digite o ID do lanche a ser deletado: "))
        data = {'debug': False, 'lanche_id': lanche_id}
        url = base_url + 'DeleteLanche'
        response = make_request(url, data)
    else:
        print("Opção inválida.")
        return

    print(response)

# Executar o menu
menu()