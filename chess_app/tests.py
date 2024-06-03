from django.test import TestCase
import chess
board = chess.Board("rnbqkbr1/ppp2p1P/5n2/3pp3/4P3/5N2/PPPP1PP1/RNBQKB1R w KQkq d6 0 1")
# Create your tests here.
moves = ["h7g8q"]
for move in moves:
    move = chess.Move.from_uci(move)
    if move in board.legal_moves:
        print(board.san(move))
        board.push(move)
    else:
        print("Unglültig")
print(board)