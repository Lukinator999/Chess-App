import threading
import queue
import time

def neue_funktion(result_queue):
    # Berechne etwas
    time.sleep(1)
    ergebnis = "Ergebnis der neuen Funktion"
    
    # Ergebnis in die Queue legen
    result_queue.put(ergebnis)

def haupt_funktion():
    result_queue = queue.Queue()
    if True:
        # Erstelle eine Queue für die Ergebniskommunikation
        result_queue = queue.Queue()

        # Erstelle und starte den neuen Thread
        thread = threading.Thread(target=neue_funktion, args=(result_queue,))
        thread.start()

        # Rückgabe eines Werts
    return "Rückgabewert der Hauptfunktion", result_queue

# Beispielaufruf
rückgabewert, result_queue = haupt_funktion()

# Hole das Ergebnis der neuen Funktion
neue_funktion_ergebnis = result_queue.get()  # Wartet, bis ein Ergebnis in der Queue ist

print(rückgabewert)
print(neue_funktion_ergebnis)