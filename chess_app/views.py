from django.shortcuts import render, redirect
from django.http import JsonResponse
import chess

# Create your views here.
def home(request):
    return render(request, "index.html")

def game(request, rat):
    board = chess.Board()
    if request.method == 'POST' and request.POST.get('is_legalmove_request', None):
        square = request.POST.get('square')
        print(square)
        legal_moves = list(board.legal_moves)
        moves = [move.uci() for move in legal_moves]
        square_moves = [move for move in moves if move[:2] == square]
        square_fields = [field[2:4] for field in square_moves]
        return JsonResponse({'moves': square_fields})
    return render(request, "game.html")