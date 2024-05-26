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
        square = chess.parse_square(square)
        print(square)
        legal_moves = list(board.legal_moves())
        moves = [move.uci() for move in legal_moves]
        print(legal_moves)
        return JsonResponse({'move': moves})
    return render(request, "game.html")