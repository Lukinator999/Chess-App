from django.shortcuts import render, redirect
from django.http import JsonResponse
import chess

# Create your views here.
def home(request):
    return render(request, "index.html")

def game(request, rat):
    board = chess.Board()
    print(rat)
    if request.method == 'POST' and request.POST.get('is_legalmove_request', None):
        square = request.POST.get('square')
        square = chess.parse_square(square)
        legal_moves = board.generate_legal_moves(square)
        print(legal_moves)
    return render(request, "game.html")